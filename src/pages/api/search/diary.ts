import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { Op } from 'sequelize';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';
import ImageFile from '@/db/models/imageFile.model';
import models from '@/db/index';
import Place from '@/db/models/place.model.';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const user = req.user;
  const searchedQuery = req.query;
  const { searchWord, prevDate, nextDate } = searchedQuery;

  const diaries = await models.Diary.findAll({
    attributes: ['did', 'd_title', 'd_thumbnail', 'd_content', 'd_date'],
    where: {
      userId: user?.id,
      [Op.or]: {
        $d_title$: {
          [Op.like]: `%${searchWord}%`,
        },
        $d_content$: {
          [Op.like]: `%${searchWord}%`,
        },
      },
      $d_date$: {
        [Op.and]: [
          {
            [Op.gte]: `${prevDate}`,
            [Op.lte]: `${nextDate}`,
          },
        ],
      },
    },
  });
  const results = await Promise.all(
    await diaries.map(async ({ did, d_thumbnail, d_title, d_date, d_content }) => {
      const image = await ImageFile.findByPk(d_thumbnail);
      return { thumbnail: image?.src, did, d_title, d_date, d_content };
    }),
  );

  console.log('diary', results);

  res.status(200).json({ results });
});

export default handler;

import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { Op } from 'sequelize';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';
import ImageFile from '@/db/models/imageFile.model';
import models from '@/db/index';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const user = req.user;
  const searchedQuery = req.query;
  const { searchWord, prevDate, nextDate } = searchedQuery;

  const diaries = await models.Diary.findAll({
    attributes: ['did', 'title', 'thumbnail', 'content', 'date'],
    where: {
      userId: user?.id,
      [Op.or]: {
        title: {
          [Op.like]: `%${searchWord}%`,
        },
        content: {
          [Op.like]: `%${searchWord}%`,
        },
      },
      date: {
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
    await diaries.map(async ({ did, thumbnail, title, date, content }) => {
      const image = await ImageFile.findByPk(thumbnail);
      return { thumbnail: image?.src, did, title, date, content };
    }),
  );

  console.log('diary', results);

  res.status(200).json({ results });
});

export default handler;

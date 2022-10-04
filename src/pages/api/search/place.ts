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

  const results = await user?.getPlace({
    where: {
      [Op.or]: {
        place_name: {
          [Op.like]: `%${searchWord}%`,
        },
        address_name: {
          [Op.like]: `%${searchWord}%`,
        },
        road_address_name: {
          [Op.like]: `%${searchWord}%`,
        },
      },
      createdAt: {
        [Op.and]: [
          {
            [Op.gte]: `${prevDate}`,
            [Op.lte]: `${nextDate}`,
          },
        ],
      },
    },
  });

  console.log('places', results);

  res.status(200).json({ results });
});

export default handler;

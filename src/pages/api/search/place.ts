import nc from 'next-connect';
import { Op } from 'sequelize';
import { NextApiResponse } from 'next';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { user } = req;
  const { searchWord } = req.query;

  const places = await user?.getPlace({
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
    },
  });

  res.status(200).json({ places });
});

export default handler;

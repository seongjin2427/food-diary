import nc from 'next-connect';
import { Op } from 'sequelize';
import { NextApiResponse } from 'next';

import models from '@/db/index';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { user } = req;
  const { searchWord } = req.query;

  const places = await models.Place.findAll({
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
    include: {
      model: models.Folder,
      as: 'folder',
      attributes: ['fid', 'title', 'color', 'icon'],
    },
  });

  const folder = await user?.getFolder({
    attributes: ['fid', 'color', 'icon', 'title'],
    include: {
      model: models.Place,
      as: 'places',
    },
  });

  res.status(200).json({ places, folder });
});

export default handler;

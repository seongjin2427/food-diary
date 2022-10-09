import nc from 'next-connect';
import { Op } from 'sequelize';
import { NextApiResponse } from 'next';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';
import ImageFile from '@/db/models/imageFile.model';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { user } = req;
  const { date } = req.query;

  console.log('month', date);

  const diary = await user?.getDiary({
    attributes: ['did', 'date', 'thumbnail'],
    where: {
      date: {
        [Op.startsWith]: `${date}%`,
      },
    },
    include: {
      model: ImageFile,
      as: 'images',
      attributes: ['img_id', 'src'],
    },
  });

  console.log('diary', diary);

  res.status(200).json({ diary });
});

export default handler;

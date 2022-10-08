import { NextApiResponse } from 'next';
import nc from 'next-connect';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';
import models from '@/db/index';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { did } = req.query;
  const { user } = req;

  try {
    const includedAttributes = ['did', 'content', 'date', 'title', 'thumbnail', 'menus', 'memo'];
    const diary = await user?.getDiary({
      attributes: includedAttributes,
      where: {
        did,
      },
      include: [
        { model: models.ImageFile, as: 'images' },
        { model: models.Place, as: 'places' },
      ],
    });

    res.status(200).json({ diary });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed!' });
  }
});

export default handler;

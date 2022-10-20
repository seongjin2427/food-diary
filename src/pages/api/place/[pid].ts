import nc from 'next-connect';
import { NextApiResponse } from 'next';

import models from '@/db/index';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { user } = req;
  const { pid } = req.query;

  try {
    const diaries = await user?.getDiary({
      attributes: ['did', 'title', 'date'],
      include: {
        model: models.Place,
        as: 'places',
        where: {
          id: pid,
        },
        attributes: ['pid'],
      },
    });

    console.log('diaries', diaries);

    res.status(200).json({ diaries });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fail!' });
  }
});

export default handler;

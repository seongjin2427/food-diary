import nc from 'next-connect';
import { NextApiResponse } from 'next';

import models from '@/db/index';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';
import { findPlace } from '@/db/utils/place';

const handler = nc();

handler.use(authToken).post(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { place } = req.body;
  try {
    const foundPlace = await findPlace(place.id);
    if (!foundPlace) await models.Place.create(place);

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fail!' });
  }
});

export default handler;

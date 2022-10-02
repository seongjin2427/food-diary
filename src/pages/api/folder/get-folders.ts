import { NextApiResponse } from 'next';
import nc from 'next-connect';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const user = req.user;

  try {
    const folders = await user?.getFolders();
    res.status(200).json({ folders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'something is wrong!' });
  }
});

export default handler;

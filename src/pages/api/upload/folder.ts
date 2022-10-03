import { NextApiResponse } from 'next';
import nc from 'next-connect';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).post(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { color, icon, title } = req.body.folder;
  const user = req.user;

  try {
    if (user) {
      const madeFolder = await user.createFolder({
        color,
        icon,
        title,
      });

      res.status(201).json({ message: 'Success!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fail!' });
  }
});

export default handler;

import { NextApiResponse } from 'next';
import nc from 'next-connect';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).post(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { color, icon, title, places } = req.body.folder;
  const user = req.user;

  try {
    if (user) {
      const madeFolder = await user.createFolder({
        f_color: color,
        f_icon: icon,
        f_title: title,
        f_places: JSON.stringify(places),
      });
      res.status(201).json({ message: 'Success!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fail!' });
  }
});

export default handler;

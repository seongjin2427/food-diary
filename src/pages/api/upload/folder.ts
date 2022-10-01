import { NextApiResponse } from 'next';
import nc from 'next-connect';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';
import Folder from '@/db/models/folder.models';

const handler = nc();

handler.use(authToken).post(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { color, icon, title, places } = req.body.folder;
  const user = req.user;

  console.log(user);
  console.log('folder', req.body.folder);

  const newFolder = {
    user,
    f_color: color,
    f_icon: icon,
    f_title: title,
    f_places: JSON.stringify(places),
  };
  try {
    await Folder.create(newFolder);
    res.status(201).json({ message: 'Success!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fail!' });
  }
});

export default handler;

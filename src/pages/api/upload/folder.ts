import Folder from '@/db/models/folder.models';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { color, icon, title, places } = req.body.folder;

  console.log('folder', req.body.folder);

  const newFolder = {
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
};

export default handler;

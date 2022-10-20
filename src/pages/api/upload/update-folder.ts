import nc from 'next-connect';
import { NextApiResponse } from 'next';

import { updateFolder } from '@/db/utils/folder';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).post(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { user } = req;
  const { folders } = req.body;

  try {
    folders.forEach(async (folder: FolderSliceFolderType) => {
      await updateFolder(folder, user);
    });

    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: 'Fail' });
  }
});

export default handler;

import nc from 'next-connect';
import { NextApiResponse } from 'next';

import { updateFolder } from '@/db/utils/folder';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';
import { findPlace } from '@/db/utils/place';

const handler = nc();

handler.use(authToken).post(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { user } = req;
  const { folders, id } = req.body;

  try {
    const convertedFolders = folders.filter((f: FolderSliceFolderType) =>
      f.places.find((p) => p.id === id),
    );

    const foundPlace = await findPlace(id);

    if (foundPlace) {
      if (convertedFolders.length > 0) await user?.addPlace(foundPlace);
      else await user?.removePlace(foundPlace);
    }

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

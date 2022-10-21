import { NextApiResponse } from 'next';
import nc from 'next-connect';

import models from '@/db/index';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { user } = req;
  try {
    const foundFolders = await user?.getFolder({
      include: [models.Folder.associations.places],
    });

    res.status(200).json({ folders: foundFolders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'something is wrong!' });
  }
});

export default handler;

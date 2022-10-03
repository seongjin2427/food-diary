import { NextApiResponse } from 'next';
import nc from 'next-connect';

import models from '@/db/index';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  try {
    const foundFolders = await models.Folder.findAll({
      include: [models.Folder.associations.places],
    });

    res.status(200).json({ folders: foundFolders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'something is wrong!' });
  }
});

export default handler;

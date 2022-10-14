import models from '@/db/index';
import Folder from '@/db/models/folder.models';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

handler.use(authToken).get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { pid } = req.query;

  console.log('pid', pid);
  try {
    const places = await models.Place.findOne({
      where: {
        $id$: pid,
      },
      include: {
        model: models.Folder,
        as: 'folder',
        attributes: ['fid', 'title', 'color', 'icon'],
      },
    });

    res.status(200).json({ places });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fail!' });
  }
});

export default handler;

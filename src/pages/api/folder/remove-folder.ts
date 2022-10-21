import nc from 'next-connect';
import { NextApiResponse } from 'next';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';
import models from '@/db/index';

const handler = nc();

handler.use(authToken).post(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  const { fid } = req.body;

  console.log(fid);

  try {
    const foundFolder = await models.Folder.findByPk(fid);
    await foundFolder?.destroy();

    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fail!' });
  }
});

export default handler;

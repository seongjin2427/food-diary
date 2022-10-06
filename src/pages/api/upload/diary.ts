import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { saveDiary } from '@/db/utils/diary';
import { saveFolder } from '@/db/utils/folder';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).post(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const user = req.user;
    const { diary, folders, additionalInfo } = req.body;

    try {
      await saveDiary(user, diary, additionalInfo);
      await saveFolder(folders);

      res.status(200).json({ message: 'Success!' });
      return;
    } catch (err) {
      res.status(500).json({ message: 'Something was wrong!' });
    }
  }
});

export default handler;

import { NextApiResponse } from 'next';
import nc from 'next-connect';

import { saveDiary, saveFolder } from '@/db/utils/diary';
import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

handler.use(authToken).post(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { diary, folder, additionalInfo } = req.body;
    const user = req.user;
    // console.log(diary);
    // console.log(folder);
    // console.log(additionalInfo);
    await saveDiary(user?.id, diary, additionalInfo);
    // await saveFolder(folder);

    res.json({ message: 'Success!' });
  }
});

export default handler;

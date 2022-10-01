import { NextApiRequest, NextApiResponse } from 'next';
import { saveDiary, saveFolder } from '@/db/utils/diary';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { diary, folder, additionalInfo } = req.body;
    console.log(diary);

    // console.log(folder);
    console.log(additionalInfo);
    await saveDiary(diary, additionalInfo);
    await saveFolder(folder);

    res.json({ message: 'Success!' });
  }
};

export default handler;

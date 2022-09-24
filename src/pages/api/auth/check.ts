import User from '@/db/models/user.model';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const email = req.body.email;

  const result = await User.findOne({
    where: {
      email,
    },
  });

  console.log(result);

  res.status(200).json({ result });
};

export default handler;

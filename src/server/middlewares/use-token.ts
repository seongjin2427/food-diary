import User from '@/db/models/user.model';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

export interface NextApiExpanededRequest extends NextApiRequest {
  user: User | null;
}

const authToken = async (req: NextApiExpanededRequest, res: NextApiResponse, next: NextHandler) => {
  const cookie = req.headers.cookie;
  const token = cookie?.split('=')[1];

  const foundUser = await User.findOne({ where: { $refresh_token$: token } });
  console.log('headers', foundUser);
  if (foundUser) {
    req.user = foundUser;
    next();
    return;
  } else {
    res.status(401).json({ message: 'Unauthorized User!' });
  }
};

export default authToken;

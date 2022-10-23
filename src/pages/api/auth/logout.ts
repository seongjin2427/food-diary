import axios from 'axios';
import nc from 'next-connect';
import { NextApiResponse } from 'next';

import authToken, { NextApiExpanededRequest } from '@/server/middlewares/use-token';

const handler = nc();

export default handler
  .use(authToken)
  .get(async (req: NextApiExpanededRequest, res: NextApiResponse) => {
    const { user } = req;

    try {
      await axios.post(
        `https://kapi.kakao.com/v1/user/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${user?.access_token}`,
          },
        },
      );

      res.setHeader('Set-Cookie', `fd_refresh_token=0; path=/; Max-Age=0;`);
      res.status(200).json({ message: 'logout!' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Logout Fail!' });
    }
  });

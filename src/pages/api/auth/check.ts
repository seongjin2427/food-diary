import User from '@/db/models/user.model';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  const { email } = req.body.userData;
  const { access_token, refresh_token } = req.body.token;
  console.log(access_token, refresh_token);

  let result = await User.findOne({
    where: {
      email,
    },
  });

  console.log('before', result);

  if (!result) {
    result = await User.create({ ...req.body.userData, access_token, refresh_token });
  } else {
    await result.update({ access_token, refresh_token });
  }

  console.log('after', result);

  res.setHeader('Set-Cookie', `fd_refresh_token=${refresh_token}; path=/;`);
  res.status(200).json({ result });
};

export default handler;

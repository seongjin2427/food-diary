import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import models from '@/db/index';

const handler = nc();

export default handler.post<NextApiRequest, NextApiResponse>(async (req, res) => {
  const { email } = req.body.userData;
  const { access_token, refresh_token } = req.body.token;

  try {
    let result = await models.User.findOne({
      where: {
        email,
      },
    });

    if (!result) {
      result = await models.User.create({ ...req.body.userData, access_token, refresh_token });
    } else {
      await result.update({ access_token, refresh_token });
    }

    res.setHeader('Set-Cookie', `fd_refresh_token=${refresh_token}; path=/;`);
    res.status(200).json({ result });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something was wrong!' });
  }
});

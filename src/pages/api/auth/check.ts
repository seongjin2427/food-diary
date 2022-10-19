import { NextApiRequest, NextApiResponse } from 'next';

import models from '@/db/index';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query;
  const refresh = req.headers['cookie']?.split('=')[1];

  try {
    console.log('token', token);
    console.log('cookie', refresh);

    const result = await models.User.findOne({
      where: {
        refresh_token: refresh,
      },
    });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fail!' });
  }
};

export default handler;

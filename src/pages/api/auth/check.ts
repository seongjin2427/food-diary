import { Op } from 'sequelize';
import { NextApiRequest, NextApiResponse } from 'next';

import models from '@/db/index';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const access_token = req.headers['authorization']?.split(' ')[1] || '';
  const refresh_token = req.headers['cookie']?.split('=')[1] || '';

  console.log('access_token, refresh_token', access_token, refresh_token);

  try {
    const result = await models.User.findOne({
      where: {
        [Op.or]: [
          {
            access_token,
          },
          {
            refresh_token,
          },
        ],
      },
    });

    console.log('result', result);

    if (result?.access_token) {
      res.setHeader('Authorization', `Bearer ${result?.access_token}`);
      res.status(200).json({ result });
    } else {
      res.status(401).json({ message: 'Unauthorized User!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Fail!' });
  }
};

export default handler;

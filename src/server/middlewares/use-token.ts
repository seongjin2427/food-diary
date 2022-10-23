import { Op } from 'sequelize';
import { NextHandler } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

import models from '@/db/index';
import User from '@/db/models/user.model';

export interface NextApiExpanededRequest extends NextApiRequest {
  user: User | null;
}

const authToken = async (req: NextApiExpanededRequest, res: NextApiResponse, next: NextHandler) => {
  const access_token = req.headers['authorization']?.split(' ')[1] || '';
  const refresh_token = req.headers.cookie?.split('=')[1] || '';

  try {
    const foundUser = await models.User.findOne({
      where: {
        [Op.or]: [
          {
            access_token,
          },
          { refresh_token },
        ],
      },
    });

    console.log('foundUser', foundUser);

    if (foundUser) {
      const nowday = new Date();
      const { refresh_token_expired_date } = foundUser;

      if (refresh_token_expired_date < nowday) {
        res.status(403).json({ message: 'Refresh Token is expired' });
      }

      req.user = foundUser;
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized User!' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server has a problem!' });
  }
};

export default authToken;

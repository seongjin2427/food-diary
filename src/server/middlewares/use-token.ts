import { Op } from 'sequelize';
import { NextHandler } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

import models from '@/db/index';
import User from '@/db/models/user.model';

export interface NextApiExpanededRequest extends NextApiRequest {
  user: User | null;
}

const authToken = async (req: NextApiExpanededRequest, res: NextApiResponse, next: NextHandler) => {
  const access_token = req.headers['authorization']?.split(' ')[1];
  const refresh_token = req.headers.cookie?.split('=')[1];

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
    console.log('headers', foundUser);

    if (foundUser) {
      const nowday = new Date();
      const { access_token_expired_date, refresh_token_expired_date } = foundUser;
      if (access_token_expired_date < nowday || refresh_token_expired_date < nowday) {
        throw new Error('token is expired');
      }

      req.user = foundUser;
      next();
      return;
    } else {
      res.status(401).json({ message: 'Unauthorized User!' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized User!' });
  }
};

export default authToken;

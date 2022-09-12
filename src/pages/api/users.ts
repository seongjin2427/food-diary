import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../db/models/user.model';
import { Op } from 'sequelize';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const user = await User.create({
    //   name: 'zz',
    //   email: 'zz@naver.com',
    // });
    // console.log(user.name, user.email);

    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      limit: 100,
      where: {
        name: {
          [Op.like]: '%z',
        },
      },
    });
    console.log('users', users);
    res.status(200).json({ users });
  } catch (e) {
    const error = e as Error;
    res.status(400).json({
      error_code: 'get_users',
      message: error.message,
    });
  }
}

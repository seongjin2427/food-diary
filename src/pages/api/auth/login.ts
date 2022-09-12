import User from '@/db/models/user.model';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

export default handler.post<NextApiRequest, NextApiResponse>(async (req, res) => {
  console.log(req.body);
  const { nickname, email, birthday, gender } = req.body.userInfo;

  User.create({
    nickname,
    email,
    birthday,
    gender,
  });

  res.status(200).json({ message: '가입 완료!' });
});

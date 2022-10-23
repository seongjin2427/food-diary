import axios from 'axios';
import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

import models from '@/db/index';

const handler = nc();

export default handler.get<NextApiRequest, NextApiResponse>(async (req, res) => {
  try {
    const { code } = req.query;

    /**
     * 카카오 인가코드 받아서 토큰 요청하기
     */
    const { data } = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        params: {
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_REST_API_KEY,
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
          client_secret: 'food-diary',
          code,
        },
        withCredentials: true,
      },
    );

    const { access_token, refresh_token, expires_in, refresh_token_expires_in } = data;

    const nowadays = new Date();
    const access_token_expired_date = new Date(
      nowadays.setSeconds(nowadays.getSeconds() + expires_in - 10800),
    );
    const refresh_token_expired_date = new Date(
      nowadays.setSeconds(nowadays.getSeconds() + refresh_token_expires_in - 10800),
    );

    /**
     * 로그인한 유저 정보 받아오기
     */
    const { data: data2 } = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        property_keys:
          '["kakao_account.profile", "kakao_account.email", "kakao_account.name", "kakao_account.birthday", "kakao_account.gender"]',
      },
      withCredentials: true,
    });

    const {
      profile: { nickname },
      email,
      birthday,
      gender,
    } = data2.kakao_account;

    let result = await models.User.findOne({
      where: {
        email,
      },
    });

    if (!result) {
      result = await models.User.create({
        email,
        birthday,
        gender,
        nickname,
        access_token,
        refresh_token,
        access_token_expired_date,
        refresh_token_expired_date,
      });
    } else {
      await result.update({
        access_token,
        refresh_token,
        access_token_expired_date,
        refresh_token_expired_date,
      });
    }

    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.setHeader(
      'Set-Cookie',
      `fd_refresh_token=${refresh_token}; path=/; Max-Age=${refresh_token_expires_in}`,
    );

    res.status(200).redirect('/');
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something was wrong!' });
  }
});

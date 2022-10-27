import Head from 'next/head';
import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import { userCheck } from '@/api/auth';
import { setUser } from '@/store/user/userSlice';
import { userLogin, userLogout } from '@/store/global';
import { useAppDispatch, useAppSelector } from '@/store/index';
import * as S from './Header.styled';

interface HeaderProps {
  children?: ReactNode;
  title: string;
}

const Header = ({ children, title }: HeaderProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector(({ global }) => global);

  useQuery(['getUser'], () => userCheck(), {
    cacheTime: 0,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      const token = localStorage.getItem('Authorization');
      if (token && data === 401) {
        alert('로그인이 필요합니다');
        reLogin();
      } else if (data === 403) {
        alert('토큰이 만료되어 재 로그인이 필요합니다');
        reLogin();
      } else if (typeof data === 'object') {
        const { nickname, email, birthday, gender } = data;
        dispatch(setUser({ nickname, email, birthday, gender }));
        dispatch(userLogin());
      }
    },
  });

  const reLogin = () => {
    localStorage.removeItem('Authorization');
    dispatch(userLogout());
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <S.Container>{children}</S.Container>
    </>
  );
};

export type HeaderType = typeof Header;

export default Header;

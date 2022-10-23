import Head from 'next/head';
import React, { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { userCheck } from '@/api/auth';
import { userLogin, userLogout } from '@/store/global';
import { setUser } from '@/store/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';
import * as S from './Header.styled';

interface HeaderProps {
  children?: ReactNode;
  title: string;
}

const Header = ({ children, title }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(({ user }) => user);
  const { isLogin } = useAppSelector(({ global }) => global);

  useQuery(['getUser'], () => userCheck(), {
    enabled: !isLogin && !email,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data === 403) {
        alert('토큰이 만료되어 재 로그인이 필요합니다');
        dispatch(userLogout());
      } else if (typeof data === 'object') {
        const { nickname, email, birthday, gender } = data;
        dispatch(setUser({ nickname, email, birthday, gender }));
        dispatch(userLogin());
      }
    },
  });

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

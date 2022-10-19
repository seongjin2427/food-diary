import Head from 'next/head';
import React, { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';

import { userCheck } from '@/api/auth';
import { setUser } from '@/store/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';
import * as S from './Header.styled';

interface HeaderProps {
  children?: ReactNode;
  title: string;
}

const Header = ({ children }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(({ user }) => user);

  useQuery(['getUser'], () => userCheck(localStorage.getItem('Authorization')), {
    enabled: !email,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data) {
        const { nickname, email, birthday, gender } = data;
        dispatch(setUser({ nickname, email, birthday, gender }));
      }
    },
  });

  return <S.Container>{children}</S.Container>;
};

export type HeaderType = typeof Header;

export default Header;

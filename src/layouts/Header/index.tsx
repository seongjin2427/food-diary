import Head from 'next/head';
import React, { ReactNode } from 'react';

import * as S from './Header.styled';

interface HeaderProps {
  children?: ReactNode;
  title: string;
}

const Header = ({ children, title }: HeaderProps) => {
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

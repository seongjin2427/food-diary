import React, { ReactNode } from 'react';
import * as S from './Header.styled';

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <S.Container>{children}</S.Container>;
};

export type HeaderType = typeof Header;

export default Header;

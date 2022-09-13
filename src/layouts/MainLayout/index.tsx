import React, { ReactNode } from 'react';
import * as S from './MainLayout.styled';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <S.Container>
      {children}
    </S.Container>
  );
};

export default MainLayout;

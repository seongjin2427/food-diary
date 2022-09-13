import SVGIcon from '@/components/shared/SVGIcon';
import React from 'react';
import * as S from './HomeHeader.styled';

function HomeHeader() {
  return (
    <S.Container>
      <S.HomeButtonArea>
        <SVGIcon icon='HomeIcon' width='2rem' />
        <SVGIcon icon='ChevronDownIcon' width='1.25rem' />
      </S.HomeButtonArea>
      <S.SearchButtonArea>
        <SVGIcon icon='SearchIcon' width='2rem' />
        <SVGIcon icon='UserCircleIcon' width='2rem' />
      </S.SearchButtonArea>
    </S.Container>
  );
}

export default HomeHeader;

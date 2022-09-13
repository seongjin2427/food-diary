import SVGIcon from '@/components/shared/SVGIcon';
import { useRouter } from 'next/router';
import React from 'react';
import { useCallback } from 'react';
import * as S from './HomeHeader.styled';

interface HomeHeaderProps {
  type: 'home' | 'next' | 'prev';
}

const HomeHeader = ({ type }: HomeHeaderProps) => {
  const router = useRouter();
  const back = useCallback(() => {
    router.back();
  }, []);

  return (
    <S.Container>
      {type === 'home' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='HomeIcon' width='2rem' />
            <SVGIcon icon='ChevronDownIcon' width='1.25rem' />
          </S.LeftButtonArea>
          <S.RightButtonArea>
            <SVGIcon icon='SearchIcon' width='2rem' />
            <SVGIcon icon='UserCircleIcon' width='2rem' />
          </S.RightButtonArea>
        </>
      )}
      {type === 'next' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='XMark' width='2rem' onClick={back} />
          </S.LeftButtonArea>
          <S.RightButtonArea>
            <S.ButtonSpan>다음</S.ButtonSpan>
            <SVGIcon icon='ChevronRightIcon' width='2rem' />
          </S.RightButtonArea>
        </>
      )}
      {type === 'prev' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='ChevronLeftIcon' width='2rem' onClick={back} />
          </S.LeftButtonArea>
        </>
      )}
    </S.Container>
  );
};

export default HomeHeader;

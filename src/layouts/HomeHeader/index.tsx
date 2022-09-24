import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './HomeHeader.styled';

interface HomeHeaderProps {
  type: 'home' | 'next' | 'prev';
  nextUrl?: string;
  nextDisabled?: boolean;
  nextFn?: () => void;
}

const HomeHeader = ({ type, nextUrl, nextDisabled, nextFn }: HomeHeaderProps) => {
  const router = useRouter();

  const moveBack = useCallback(() => {
    router.back();
  }, []);

  const moveHomePage = useCallback(() => {
    router.push('/');
  }, []);

  const moveNextPage = useCallback(() => {
    nextFn && nextFn();
    if (nextUrl && nextDisabled) {
      router.push(nextUrl);
    }
  }, [nextDisabled, nextFn]);

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
            <SVGIcon icon='SettingsIcon' width='2rem' />
          </S.RightButtonArea>
        </>
      )}
      {type === 'next' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='XMark' width='2rem' onClick={moveHomePage} />
          </S.LeftButtonArea>
          <S.RightButtonArea onClick={moveNextPage} disabled={!nextDisabled}>
            <S.ButtonSpan>다음</S.ButtonSpan>
            <SVGIcon icon='ChevronRightIcon' width='2rem' />
          </S.RightButtonArea>
        </>
      )}
      {type === 'prev' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='ChevronLeftIcon' width='2rem' onClick={moveBack} />
          </S.LeftButtonArea>
        </>
      )}
    </S.Container>
  );
};

export default HomeHeader;

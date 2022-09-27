import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './CommonHeader.styled';

interface CommonHeaderProps {
  type: 'home' | 'next' | 'prev' | 'both';
  nextText?: string;
  nextUrl?: string;
  nextDisabled?: boolean;
  nextFn?: () => void;
}

const CommonHeader = ({
  type,
  nextText = '다음',
  nextUrl,
  nextDisabled,
  nextFn,
}: CommonHeaderProps) => {
  const router = useRouter();

  const moveBack = useCallback(() => {
    router.back();
  }, []);

  const moveHomePage = useCallback(() => {
    router.push('/');
  }, []);

  const moveNextPage = useCallback(() => {
    if (nextUrl && nextDisabled) {
      nextFn && nextFn();
      router.push(nextUrl);
    }
  }, [nextDisabled, nextFn]);

  return (
    <S.Container>
      {type === 'both' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='ChevronLeftIcon' width='2rem' onClick={moveBack} />
          </S.LeftButtonArea>
          <S.RightButtonArea onClick={moveNextPage} disabled={!nextDisabled}>
            <S.ButtonSpan>{nextText}</S.ButtonSpan>
            <SVGIcon icon='ChevronRightIcon' width='2rem' />
          </S.RightButtonArea>
        </>
      )}
      {type === 'next' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='XMark' width='2rem' onClick={moveHomePage} />
          </S.LeftButtonArea>
          <S.RightButtonArea onClick={moveNextPage} disabled={!nextDisabled}>
            <S.ButtonSpan>{nextText}</S.ButtonSpan>
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

export default CommonHeader;

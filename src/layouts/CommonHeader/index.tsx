import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './CommonHeader.styled';

interface CommonHeaderProps {
  type: 'next' | 'prev' | 'both' | 'read-diary';
  nextText?: string;
  nextUrl?: string;
  nextDisabled?: boolean;
  nextFn?: () => void;
  removeFn?: () => void;
}

const CommonHeader = ({
  nextText = '다음',
  nextDisabled,
  type,
  nextUrl,
  nextFn,
  removeFn,
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
      console.log('next');
      nextFn && nextFn();
      router.push(nextUrl);
    }
  }, [nextDisabled, nextFn]);

  return (
    <S.Container>
      {type === 'both' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='ChevronLeftIcon' width='2rem' height='2rem' onClick={moveBack} />
          </S.LeftButtonArea>
          <S.RightButtonArea onClick={moveNextPage} disabled={!nextDisabled}>
            <S.ButtonSpan>{nextText}</S.ButtonSpan>
            <SVGIcon icon='ChevronRightIcon' width='2rem' height='2rem' />
          </S.RightButtonArea>
        </>
      )}
      {type === 'next' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='XMark' width='2rem' height='2rem' onClick={moveHomePage} />
          </S.LeftButtonArea>
          <S.RightButtonArea onClick={moveNextPage} disabled={!nextDisabled}>
            <S.ButtonSpan>{nextText}</S.ButtonSpan>
            <SVGIcon icon='ChevronRightIcon' width='2rem' height='2rem' />
          </S.RightButtonArea>
        </>
      )}
      {type === 'prev' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='ChevronLeftIcon' width='2rem' height='2rem' onClick={moveBack} />
          </S.LeftButtonArea>
        </>
      )}
      {type === 'read-diary' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='ChevronLeftIcon' width='2rem' height='2rem' onClick={moveBack} />
          </S.LeftButtonArea>
          <S.RightButtonArea>
            <SVGIcon icon='PenIcon' width='2rem' height='2rem' onClick={moveNextPage} />
            <SVGIcon icon='BinIcon' width='2rem' height='2rem' onClick={removeFn} />
          </S.RightButtonArea>
        </>
      )}
    </S.Container>
  );
};

export default CommonHeader;

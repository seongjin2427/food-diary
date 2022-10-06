import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './HomeHeader.styled';

interface HomeHeaderProps {
  type: 'home';
  nextUrl?: string;
  nextDisabled?: boolean;
  nextFn?: () => void;
}

const HomeHeader = ({ type, nextUrl, nextDisabled, nextFn }: HomeHeaderProps) => {
  const router = useRouter();

  const moveNextPage = useCallback(() => {
    if (nextUrl && nextDisabled) {
      nextFn && nextFn();
      router.push(nextUrl);
    }
  }, [nextDisabled, nextFn]);

  const moveSearchPage = useCallback(() => {
    router.push('/search/diary');
  }, [router]);

  return (
    <S.Container>
      {type === 'home' && (
        <>
          <S.LeftButtonArea>
            <SVGIcon icon='HomeIcon' width='2rem' />
            <SVGIcon icon='ChevronDownIcon' width='1.25rem' />
          </S.LeftButtonArea>
          <S.RightButtonArea>
            <SVGIcon icon='SearchIcon' width='2rem' onClick={moveSearchPage} />
            <SVGIcon icon='SettingsIcon' width='2rem' />
          </S.RightButtonArea>
        </>
      )}
    </S.Container>
  );
};

export default HomeHeader;

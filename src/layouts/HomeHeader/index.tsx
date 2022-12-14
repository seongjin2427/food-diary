import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import HomeDropdown from '@/components/shared/HomeDropdown';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './HomeHeader.styled';
import { HOME_HEADER_DROPDOWN } from '@/constants/dropdown';
import Link from 'next/link';

interface HomeHeaderProps {
  type: 'home' | 'map';
}

const HomeHeader = ({ type }: HomeHeaderProps) => {
  const router = useRouter();

  const moveSearchPage = useCallback(() => {
    router.push('/search/diary');
  }, [router]);

  return (
    <S.Container>
      <>
        <S.LeftButtonArea>
          <HomeDropdown menus={HOME_HEADER_DROPDOWN} />
        </S.LeftButtonArea>
        <S.RightButtonArea>
          {type === 'home' && (
            <>
              <Link href='/search/diary'>
                <a>
                  <SVGIcon icon='SearchIcon' width='2rem' onClick={moveSearchPage} />
                </a>
              </Link>
              <Link href='/setting'>
                <a>
                  <SVGIcon icon='SettingsIcon' width='2rem' />
                </a>
              </Link>
            </>
          )}
        </S.RightButtonArea>
      </>
    </S.Container>
  );
};

export default HomeHeader;

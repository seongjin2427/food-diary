import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

import { HomeHeaderDropdownType } from '@/constants/dropdown';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './HomeDropdown.styled';

interface HomeDropdownProps {
  menus: HomeHeaderDropdownType;
}

const HomeDropdown = ({ menus }: HomeDropdownProps) => {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<JSX.Element>(initialSelect());

  function initialSelect() {
    const index = menus.findIndex(({ url }) => router.asPath === url);
    return menus[index].icon;
  }

  const onClickToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const onClickSelectIcon = useCallback((select: JSX.Element) => {
    setSelected(select);
    setOpen(false);
  }, []);

  return (
    <S.Container>
      <S.Backdrop toggle={open} onClick={onClickToggle} />
      <S.Selected onClick={onClickToggle}>
        {selected}
        <SVGIcon icon='ChevronDownIcon' width='1rem' height='1rem' />
      </S.Selected>
      <S.DropdownList isOpen={open}>
        {menus.map(
          ({ icon, url }) =>
            selected !== icon && (
              <Link key={url} href={url}>
                <S.DropdownItem onClick={() => onClickSelectIcon(icon)}>{icon}</S.DropdownItem>
              </Link>
            ),
        )}
      </S.DropdownList>
    </S.Container>
  );
};

export default HomeDropdown;

/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './Dropdown.styled';

interface DropdownContextType {
  toggle: boolean;
  onToggle: (b: boolean) => void;
  index: number;
  selectIndex: (v: number) => void;
}

const DropdownContext = createContext<DropdownContextType>({
  index: 0,
  toggle: false,
  onToggle: () => {},
  selectIndex: () => {},
});

const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  return ctx;
};

const DropdownProvider = ({ children }: ChildrenProps) => {
  const [items, setItems] = useState<ReactNode[] | undefined>();
  const [toggle, setToggle] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const onToggle = (b: boolean) => setToggle(b);
  const selectIndex = (v: number) => setIndex(v);
  const setOnItems = (v: ReactNode[]) => setItems(v);

  const value = { toggle, onToggle, index, selectIndex, items, setOnItems };

  return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
};

interface ChildrenProps {
  children: ReactNode;
}

const Dropdown = ({ children }: ChildrenProps) => {
  return (
    <DropdownProvider>
      <S.Container>{children}</S.Container>
    </DropdownProvider>
  );
};

const DropdownSelectItem = () => {
  const { index, onToggle, toggle } = useDropdownContext();

  return (
    <S.DropdownSelectItem onClick={() => onToggle(!toggle)}>
      {index}
      <SVGIcon icon='ChevronDownIcon' width='1rem' height='1rem' />
    </S.DropdownSelectItem>
  );
};

const DropdownList = ({ children }: ChildrenProps) => {
  const ctx = useDropdownContext();

  return <S.DropdownList toggle={ctx.toggle}>{children}</S.DropdownList>;
};

interface DropdownItemProps {
  children: ReactNode;
  url: string;
  idx: number;
}

function DropdownItem({ children, url, idx }: DropdownItemProps) {
  const ctx = useDropdownContext();

  const onClickDropdownItem = (v: number) => {
    ctx.selectIndex(v);
    ctx.onToggle(false);
  };

  return <S.DropdownItem onClick={() => onClickDropdownItem(idx)}>{children}</S.DropdownItem>;
}

Dropdown.SelectItem = DropdownSelectItem;
Dropdown.Item = DropdownItem;
Dropdown.List = DropdownList;

export default Dropdown;

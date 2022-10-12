import React, { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/index';
import { searchBySearchWord, selectSearchOption } from '@/store/search/searchSlice';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './SearchInput.styled';

const SEARCH_OPTIONS = [
  {
    name: '지도',
    value: 'map',
  },
  {
    name: '폴더',
    value: 'folder',
  },
] as const;

interface SerachInputProps {
  searchMap?: boolean;
}

const SearchInput = ({ searchMap }: SerachInputProps) => {
  const dispatch = useAppDispatch();
  const { searchWord, searchOption } = useAppSelector(({ search }) => search);

  const [open, setOpen] = useState<boolean>(false);
  const searchWordInputRef = useRef<HTMLInputElement>(null);

  const onClickChangeSearchOption = useCallback((value: 'map' | 'folder') => {
    dispatch(selectSearchOption(value));
    setOpen(false);
  }, []);

  const onChangeSearchWord = useCallback(
    async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      dispatch(searchBySearchWord(value));
    },
    [searchWord],
  );

  const onClickChangeSearchWord = useCallback(() => {
    if (searchWordInputRef.current && searchOption === 'folder') {
      dispatch(searchBySearchWord(searchWordInputRef.current.value));
    }
  }, [searchOption]);

  const onKeyupChangeSearchWord = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Enter' && searchWordInputRef.current && searchOption === 'folder') {
      dispatch(searchBySearchWord(searchWordInputRef.current.value));
    }
  }, [searchOption]);

  return (
    <S.Container>
      {searchMap && (
        <S.SearchInputSelectArea>
          {SEARCH_OPTIONS.map(
            ({ name, value }) =>
              value === searchOption && (
                <S.SelectSearchOption key={value} onClick={() => setOpen(!open)}>
                  {name}
                </S.SelectSearchOption>
              ),
          )}
          <SVGIcon icon='ChevronDownIcon' width='1rem' />
          <S.SearchInputSelectUl isOpen={open}>
            {SEARCH_OPTIONS.map(
              ({ name, value }) =>
                value !== searchOption && (
                  <S.SearchInputSelectLi
                    key={value}
                    onClick={() => onClickChangeSearchOption(value)}
                  >
                    {name}
                  </S.SearchInputSelectLi>
                ),
            )}
          </S.SearchInputSelectUl>
        </S.SearchInputSelectArea>
      )}
      <S.SearchInputArea>
        {!searchMap && <S.SearchInput value={searchWord} onChange={onChangeSearchWord} />}
        {searchMap && <S.SearchInput ref={searchWordInputRef} onKeyUp={onKeyupChangeSearchWord} />}
        <S.SearchButton onClick={onClickChangeSearchWord}>
          <SVGIcon icon='SearchIcon' width='1.5rem' height='1.5rem' />
        </S.SearchButton>
      </S.SearchInputArea>
    </S.Container>
  );
};

export default SearchInput;

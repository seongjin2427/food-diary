import React, { useCallback, useState } from 'react';

import { SearchDiaryActionType, SearchDiaryType } from '@/hooks/useSearchDiary';
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
];

interface SerachInputProps {
  searchDiaryStates: SearchDiaryType;
  searchDiaryActions: SearchDiaryActionType;
  searchMap?: boolean;
}

const SearchInput = ({ searchDiaryStates, searchDiaryActions, searchMap }: SerachInputProps) => {
  const { searchWord } = searchDiaryStates;
  const { onSearch } = searchDiaryActions;

  const [open, setOpen] = useState<boolean>(false);
  const [searchOption, setSearchOption] = useState<string>('map');

  const onClickChangeSearchOption = useCallback((value: string) => {
    setSearchOption(value);
    setOpen(false);
  }, []);

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
        <S.SearchInput value={searchWord} onChange={onSearch} />
      </S.SearchInputArea>
    </S.Container>
  );
};

export default SearchInput;

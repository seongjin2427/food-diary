import React from 'react';

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
    value: 'map',
  },
];

interface SerachInputProps {
  searchDiaryStates: SearchDiaryType;
  searchDiaryActions: SearchDiaryActionType;
  searchMap?: boolean;
}

const SearchInput = ({ searchDiaryStates, searchDiaryActions, searchMap }: SerachInputProps) => {
  const { open, searchOption, searchWord } = searchDiaryStates;
  const { onToggleOpen, onSearch, selectSearchOption } = searchDiaryActions;

  return (
    <S.Container>
      {searchMap && (
        <S.SearchInputSelectArea>
          {SEARCH_OPTIONS.map(
            ({ name, value }) =>
              value === searchOption && (
                <S.SelectSearchOption key={value} onClick={onToggleOpen}>
                  {name}
                </S.SelectSearchOption>
              ),
          )}
          <SVGIcon icon='ChevronDownIcon' width='1rem' />
          <S.SearchInputSelectUl isOpen={open}>
            {SEARCH_OPTIONS.map(
              ({ name, value }) =>
                value !== searchOption && (
                  <S.SearchInputSelectLi key={value} onClick={() => selectSearchOption(value)}>
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

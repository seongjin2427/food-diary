import React from 'react';

import useSearchDiary from '@/hooks/useSearchDiary';
import SearchInput from '@/components/shared/SearchInput';
import SelectPeriod from '@/components/search/SelectPeriod';
import SearchResultDiary from '@/components/shared/SearchResultDiary';
import * as S from './SearchDiary.styled';

const SearchDiary = () => {
  const [states, actions] = useSearchDiary();

  return (
    <S.Container>
      <S.SearchArea>
        <SearchInput />
      </S.SearchArea>
      <S.PeriodArea>
        <SelectPeriod searchDiaryStates={states} searchDiaryActions={actions} />
      </S.PeriodArea>
      <S.SearchResultArea>
        <SearchResultDiary searchDiaryStates={states} />
      </S.SearchResultArea>
    </S.Container>
  );
};

export default SearchDiary;

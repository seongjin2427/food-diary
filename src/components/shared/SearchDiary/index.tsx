import React from 'react';

import useSearchDiary from '@/hooks/useSearchDiary';
import SearchInput from '@/components/shared/SearchInput';
import * as S from './SearchDiary.styled';
import SelectPeriod from '@/components/shared/SelectPeriod';
import SearchResultDiary from '@/components/shared/SearchResultDiary';

const SearchDiary = () => {
  const [states, actions] = useSearchDiary();

  return (
    <S.Container>
      <S.SearchArea>
        <SearchInput searchDiaryStates={states} searchDiaryActions={actions} />
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

import React from 'react';

import useSearchDiary from '@/hooks/useSearchDiary';
import SearchInput from '@/components/shared/SearchInput';
import * as S from './SearchDiary.styled';
import SelectPeriod from '@/components/shared/SelectPeriod';
import SearchResultDiary from '@/components/shared/SearchResultDiary';
import SearchResultMap from '@/components/shared/SearchResultMap';
import Map from '@/components/shared/Map';

const SearchDiary = () => {
  const [states, actions] = useSearchDiary();
  const { searchOption } = states;

  return (
    <S.Container>
      <S.SearchArea>
        <SearchInput searchDiaryStates={states} searchDiaryActions={actions} />
      </S.SearchArea>
      <S.PeriodArea>
        <SelectPeriod searchDiaryStates={states} searchDiaryActions={actions} />
      </S.PeriodArea>
      <S.SearchResultArea>
        {(searchOption === 'diary' || searchOption === 'all') && (
          <SearchResultDiary searchDiaryStates={states} />
        )}
        {searchOption === 'map' && (
          <>
            <SearchResultMap searchDiaryStates={states} searchDiaryActions={actions} />
            <Map searchDiaryStates={states}  searchDiaryActions={actions}/>
          </>
        )}
      </S.SearchResultArea>
      <S.MapArea></S.MapArea>
    </S.Container>
  );
};

export default SearchDiary;

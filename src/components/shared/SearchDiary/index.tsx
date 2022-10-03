import React from 'react';

import SearchInput from '@/components/shared/SearchInput';
import * as S from './SearchDiary.styled';
import useSearchDiary from '@/hooks/useSearchDiary';

const SearchDiary = () => {
  const [states, actions] = useSearchDiary();

  return (
    <S.Container>
      <SearchInput searchDiaryStates={states} searchDiaryActions={actions} />
    </S.Container>
  );
};

export default SearchDiary;

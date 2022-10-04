import { SearchDiaryType } from '@/hooks/useSearchDiary';
import dayjs from 'dayjs';
import React from 'react';

import * as S from './SearchResultDiary.styled';

interface SearchResultDiaryProps {
  searchDiaryStates: SearchDiaryType;
}

const SearchResultDiary = ({ searchDiaryStates }: SearchResultDiaryProps) => {
  const { searchResults } = searchDiaryStates;
  const reg = /<[^>]*>?/g;

  return (
    <S.Container>
      {searchResults?.map(({ did, d_content, d_date, d_title, thumbnail }) => (
        <S.DiaryContainer key={did}>
          <S.DiaryImageArea>
            <S.DiaryImage src={thumbnail} />
          </S.DiaryImageArea>
          <S.DiaryContentArea>
            <S.DiaryWrittenDate>{dayjs(d_date).format('YYYY-MM-DD')}</S.DiaryWrittenDate>
            <S.DiaryTitle>{d_title}</S.DiaryTitle>
            <S.DiaryContent>{d_content.replace(reg, '')}</S.DiaryContent>
          </S.DiaryContentArea>
        </S.DiaryContainer>
      ))}
    </S.Container>
  );
};

export default SearchResultDiary;

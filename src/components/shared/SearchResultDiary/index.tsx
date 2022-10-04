import dayjs from 'dayjs';
import React from 'react';

import { SearchDiaryType } from '@/hooks/useSearchDiary';
import * as S from './SearchResultDiary.styled';

interface SearchResultDiaryProps {
  searchDiaryStates: SearchDiaryType;
}

const SearchResultDiary = ({ searchDiaryStates }: SearchResultDiaryProps) => {
  const { searchDiaryResults } = searchDiaryStates;
  const reg = /<[^>]*>?/g;

  return (
    <S.Container>
      {searchDiaryResults &&
        searchDiaryResults?.length > 0 &&
        searchDiaryResults?.map(({ did, d_content, d_date, d_title, thumbnail }) => (
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
      {searchDiaryResults?.length === 0 && (
        <S.DiaryContentArea>검색 결과가 없습니다.</S.DiaryContentArea>
      )}
    </S.Container>
  );
};

export default SearchResultDiary;

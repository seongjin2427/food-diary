import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import dayjs from 'dayjs';

import { SearchDiaryType } from '@/hooks/useSearchDiary';
import * as S from './SearchResultDiary.styled';

interface SearchResultDiaryProps {
  searchDiaryStates: SearchDiaryType;
}

const SearchResultDiary = ({ searchDiaryStates }: SearchResultDiaryProps) => {
  const router = useRouter();
  const { searchDiaryResults } = searchDiaryStates;
  const reg = /<[^>]*>?/g;

  const moveToClickDiary = useCallback((did: number) => {
    router.push(`/diary/${did}`);
  }, []);

  return (
    <S.Container>
      {searchDiaryResults &&
        searchDiaryResults?.length > 0 &&
        searchDiaryResults?.map(({ did, content, date, title, thumbnail }) => (
          <S.DiaryContainer key={did} onClick={() => moveToClickDiary(did)}>
            <S.DiaryImageArea>
              <S.DiaryImage src={thumbnail} />
            </S.DiaryImageArea>
            <S.DiaryContentArea>
              <S.DiaryWrittenDate>{dayjs(date).format('YYYY-MM-DD')}</S.DiaryWrittenDate>
              <S.DiaryTitle>{title}</S.DiaryTitle>
              <S.DiaryContent>{content.replace(reg, '')}</S.DiaryContent>
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

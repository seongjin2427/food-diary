import React, { FormEvent, useCallback, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/index';
import { addPlace, removePlace, setDiaryByName } from '@/store/diary/diarySlice';
import { removePlaceInFolder } from '@/store/diary/folderSlice';
import useSearchPlace, { SearchResultType } from '@/hooks/useSearchPlace';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './SearchPlaces.styled';

interface SearchPlacesProps {
  slug: string[];
}

const SearchPlaces = ({ slug }: SearchPlacesProps) => {
  const [day, month, year] = slug;
  const dispatch = useAppDispatch();
  const pickedPlaces = useAppSelector(({ diary }) => diary.places);

  const [searchedPlaces, searchHistoryRef, { search }] = useSearchPlace();
  const searchWordRef = useRef<HTMLInputElement>(null);

  const searchPlaces = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (searchWordRef.current && searchWordRef.current.value !== '' && searchHistoryRef.current) {
      const searchWord = searchWordRef.current.value;
      const prevSearchWord = searchHistoryRef.current[0];

      if (prevSearchWord !== searchWord) {
        search(searchWord);
      }
      searchWordRef.current.value = '';
    }
  }, []);

  const pickPlace = useCallback((place: SearchResultType) => {
    const value = `${year}-${month}-${day}`;
    dispatch(addPlace(place));
    dispatch(setDiaryByName({ name: 'date', value }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const deletePlace = useCallback((place: SearchResultType) => {
    dispatch(removePlace(place));
    dispatch(removePlaceInFolder(place.id));
  }, []);

  return (
    <S.Container>
      <S.LetMeknowThePlaceTitle>
        {year}년 {month}월 {day}일에 <br />
        방문하신 장소를 알려주세요!
      </S.LetMeknowThePlaceTitle>

      <S.PlaceTags>
        {pickedPlaces.length > 0 &&
          pickedPlaces.map((place) => (
            <S.PlaceTag key={place.id}>
              <SVGIcon icon='XMark' width='1rem' onClick={() => deletePlace(place)} />
              <S.Tag>{place.place_name}</S.Tag>
            </S.PlaceTag>
          ))}
      </S.PlaceTags>

      <S.WriteDiarySearchPlaceForm onSubmit={searchPlaces}>
        <S.WriteDiarySearchPlaceInput ref={searchWordRef} />
        <SVGIcon icon='SearchIcon' width='2rem' onClick={searchPlaces} />
      </S.WriteDiarySearchPlaceForm>

      <S.PlaceContainer>
        {searchedPlaces &&
          searchedPlaces.map((val) => (
            <S.PlaceBox key={val.id} onClick={() => pickPlace(val)}>
              <S.PlaceName>{val.place_name}</S.PlaceName>
              <S.PlaceAddress>{val.address_name}</S.PlaceAddress>
            </S.PlaceBox>
          ))}
        {searchedPlaces && searchedPlaces.length <= 0 && (
          <S.PlaceBox>
            <S.NoPlaces>검색 결과가 없습니다.</S.NoPlaces>
          </S.PlaceBox>
        )}
      </S.PlaceContainer>
      <S.MorePlacesButton id='place_next_button'>더 보기</S.MorePlacesButton>
    </S.Container>
  );
};

export default SearchPlaces;

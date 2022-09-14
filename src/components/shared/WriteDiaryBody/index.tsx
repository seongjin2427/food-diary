import React, { FormEvent, useCallback, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/index';
import { addPlace, removePlace } from '@/store/diary';
import useSearchPlace, { SearchResultType } from '@/hooks/useSearchPlace';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './WriteDiaryBody.styled';

interface WriteDiayBodyProps {
  slug: string[];
}

const WriteDiayBody = ({ slug }: WriteDiayBodyProps) => {
  const [day, month, year] = slug;
  
  const pickedPlaces = useAppSelector((state) => state.diary.places);
  const dispatch = useAppDispatch();

  const [searchedPlaces, { search }] = useSearchPlace();
  const searchWordRef = useRef<HTMLInputElement>(null);

  const searchPlaces = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (searchWordRef.current && searchWordRef.current.value !== '') {
      search(searchWordRef.current.value);
      searchWordRef.current.value = '';
    }
  }, []);

  const pickPlace = useCallback((place: SearchResultType) => {
    dispatch(addPlace(place));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const deletePlace = useCallback((place: SearchResultType) => {
    dispatch(removePlace(place));
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
              <S.Tag>{place.place_name}</S.Tag>
              <SVGIcon icon='XMark' width='1rem' onClick={() => deletePlace(place)} />
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
    </S.Container>
  );
};

export default WriteDiayBody;

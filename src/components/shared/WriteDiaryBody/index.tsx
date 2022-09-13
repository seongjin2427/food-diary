import SVGIcon from '@/components/shared/SVGIcon';
import React, { FormEvent, useCallback, useRef, useState } from 'react';
import * as S from './WriteDiaryBody.styled';
import useSearchPlace, { SearchResultType } from '@/hooks/useSearchPlace';

interface WriteDiayBodyProps {
  slug: string[];
}

const WriteDiayBody = ({ slug }: WriteDiayBodyProps) => {
  const [day, month, year] = slug;
  const [searchedPlaces, { search }] = useSearchPlace();
  const [pickedPlaces, setPickedPlaces] = useState<SearchResultType[]>([]);
  const searchWordRef = useRef<HTMLInputElement>(null);

  const searchPlaces = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (searchWordRef.current) {
      search(searchWordRef.current.value);
      searchWordRef.current.value = '';
    }
  }, []);

  const pickPlace = useCallback((place: SearchResultType) => {
    console.log('pickedPlaces', pickedPlaces);
    setPickedPlaces((prev) => {
      if (prev.find((pc) => pc.id === place.id) || prev.length > 10) {
        return [...prev];
      } else {
        return [...prev, place];
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const removePlace = useCallback((place: SearchResultType) => {
    console.log('pickedPlaces', pickedPlaces);
    setPickedPlaces((prev) => prev.filter((pc) => pc.id !== place.id));
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
              <SVGIcon icon='XMark' width='1rem' onClick={() => removePlace(place)} />
            </S.PlaceTag>
          ))}
      </S.PlaceTags>
      <S.WriteDiarySearchPlaceForm onSubmit={searchPlaces}>
        <S.WriteDiarySearchPlaceInput ref={searchWordRef} />
        <SVGIcon icon='SearchIcon' width='2rem' />
      </S.WriteDiarySearchPlaceForm>
      <S.PlaceContainer>
        {searchedPlaces &&
          searchedPlaces.map((val) => (
            <S.PlaceBox key={val.id} onClick={() => pickPlace(val)}>
              <S.PlaceName>{val.place_name}</S.PlaceName>
              <S.PlaceAddress>{val.address_name}</S.PlaceAddress>
            </S.PlaceBox>
          ))}
      </S.PlaceContainer>
    </S.Container>
  );
};

export default WriteDiayBody;

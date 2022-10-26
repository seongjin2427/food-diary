import SlickSlider from 'react-slick';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef } from 'react';

import { setPlace } from '@/store/place/placeSlice';
import { useAppDispatch } from '@/store/index';
import { SearchResultType } from '@/hooks/useSearchPlace';
import { SearchMapsActionType, SearchMapsType } from '@/hooks/useSearchMaps';
import SVGIcon from '@/components/shared/SVGIcon';
import Slider from '@/components/shared/Slider';
import * as S from './SearchResultMap.styled';

interface SearchResultMapProps {
  searchMapsStates: SearchMapsType;
  searchMapsActions: SearchMapsActionType;
  showList?: boolean;
}

const SearchResultMap = ({
  showList,
  searchMapsStates,
  searchMapsActions,
}: SearchResultMapProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchPlaceResults, folderResults } = searchMapsStates;

  const sliderRef = useRef<SlickSlider>(null);

  const moveToPlacePageByPid = useCallback((place: SearchResultType) => {
    dispatch(setPlace(place));
    router.push(`/place`);
  }, []);

  useEffect(() => {
    sliderRef.current?.slickGoTo(0);
  }, [searchPlaceResults]);

  return (
    <S.Container>
      {!showList && searchPlaceResults && searchPlaceResults.length > 0 && (
        <Slider ref={sliderRef}>
          {searchPlaceResults.map((place, idx) => (
            <S.PlaceContainer key={idx} onClick={() => moveToPlacePageByPid(place)}>
              <S.PlaceTitleBox>
                <S.PlaceName>{place.place_name}</S.PlaceName>
              </S.PlaceTitleBox>
              <S.PlaceContentBox>
                <S.PlaceAddress>{place.address_name}</S.PlaceAddress>
                <S.PlacePhone>{place.phone}</S.PlacePhone>
                <S.PlaceDistance>{+place.distance / 1000}km</S.PlaceDistance>
              </S.PlaceContentBox>
              <S.PlaceKind>
                {folderResults?.map(
                  ({ fid, icon, color, places }) =>
                    places.find((p) => p.id === place.id) && (
                      <S.FolderIcon key={fid} selectedColor={color}>
                        <SVGIcon icon={icon} width='1.25rem' height='1.25rem' />
                      </S.FolderIcon>
                    ),
                )}
              </S.PlaceKind>
            </S.PlaceContainer>
          ))}
        </Slider>
      )}
      {showList && (
        <>
          {searchPlaceResults &&
            searchPlaceResults.map((place, idx) => (
              <S.PlaceListContainer key={idx} onClick={() => moveToPlacePageByPid(place)}>
                <S.PlaceTitleBox>
                  <S.PlaceName>{place.place_name}</S.PlaceName>
                  <S.PlaceKind>
                    {folderResults?.map(
                      ({ fid, icon, color, places }) =>
                        places.find((p) => p.id === place.id) && (
                          <S.FolderIcon key={fid} selectedColor={color}>
                            <SVGIcon icon={icon} width='1.25rem' height='1.25rem' />
                          </S.FolderIcon>
                        ),
                    )}
                  </S.PlaceKind>
                </S.PlaceTitleBox>
                <S.PlaceContentBox>
                  <S.PlaceAddress>{place.address_name}</S.PlaceAddress>
                  <S.PlacePhone>{place.phone}</S.PlacePhone>
                  <S.PlaceDistance>{+place.distance / 1000}km</S.PlaceDistance>
                </S.PlaceContentBox>
              </S.PlaceListContainer>
            ))}
        </>
      )}
      {searchPlaceResults && searchPlaceResults.length <= 0 && (
        <S.NoPlaces>검색된 장소가 없습니다</S.NoPlaces>
      )}
    </S.Container>
  );
};

export default SearchResultMap;

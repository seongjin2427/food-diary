import { useCallback, useState } from 'react';

interface GeolocationType {
  coords: GeolocationCoordinates;
}

export interface SearchResultType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface SearchResultPaginationType {
  current: number;
  first: number;
  gotoFirst: () => void;
  gotoLast: () => void;
  gotoPage: (a: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  last: number;
  nextPage: () => void;
  perPage: number;
  prevPage: () => void;
  totalCount: number;
}

interface SearchPlaceActions {
  search: (s: string) => void;
}

const useSearchPlace = (): [SearchResultType[] | undefined, SearchPlaceActions] => {
  const [searchedPlaces, setSearchedPlaces] = useState<SearchResultType[]>();

  const search = useCallback(async (searchWord: string) => {
    await navigator.geolocation.getCurrentPosition(({ coords }: GeolocationType) => {
      // console.log(coords);
      const kakao = window.kakao;
      const places = new kakao.maps.services.Places();

      places.keywordSearch(
        searchWord,
        (
          data: SearchResultType[],
          status: 'OK' | 'ZERO_RESULT',
          pagination: SearchResultPaginationType,
        ) => {
          console.log(data, status, pagination);
          if (status === kakao.maps.services.Status.OK) {
            // console.log(data);
            setSearchedPlaces(data);
          } else if (status === 'ZERO_RESULT') {
            setSearchedPlaces([]);
          }
        },
        {
          radius: 20000,
          location: new kakao.maps.LatLng(coords.latitude, coords.longitude),
        },
      );
    });
  }, []);

  const actions = {
    search,
  };

  return [searchedPlaces, actions];
};

export default useSearchPlace;

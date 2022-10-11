import { useState, useCallback, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  getSearchPlacesBySearchWord,
  getSearchPlacesBySearchWordSearchResultData,
} from '@/api/diary';
import { useAppDispatch, useAppSelector } from '@/store/index';
import { searchBySearchWord } from '@/store/search/searchSlice';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';

export interface SearchMapsType {
  currentPlace: number;
  searchPlaceResults: getSearchPlacesBySearchWordSearchResultData[] | undefined;
  folderResults: FolderSliceFolderType[] | undefined;
}

export interface SearchMapsActionType {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  setPrevPlace: () => void;
  setNextPlace: () => void;
  changeCurrentPlace: (n: number) => void;
}

const useSearchMaps = (): [SearchMapsType, SearchMapsActionType] => {
  const dispatch = useAppDispatch();
  const { searchWord } = useAppSelector(({ search }) => search);

  const [currentPlace, setCurrentPlace] = useState<number>(0);
  const [searchPlaceResults, setSearchPlaceResults] = useState<
    getSearchPlacesBySearchWordSearchResultData[] | undefined
  >([]);

  const [folderResults, setFolderResults] = useState<FolderSliceFolderType[] | undefined>([]);

  useQuery(['searchPlaceResult', searchWord], () => getSearchPlacesBySearchWord(searchWord), {
    refetchOnWindowFocus: false,
    onSuccess: (searchedData) => {
      setSearchPlaceResults(searchedData?.places);
      setFolderResults(searchedData?.folder);
    },
  });

  const actions: SearchMapsActionType = {
    onSearch: useCallback(
      async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchBySearchWord(value));
      },
      [searchWord],
    ),
    setPrevPlace: useCallback(() => {
      if (currentPlace > 0) {
        setCurrentPlace((prev) => prev - 1);
      }
    }, [searchPlaceResults, currentPlace]),
    setNextPlace: useCallback(() => {
      if (searchPlaceResults) {
        if (currentPlace < searchPlaceResults.length - 1) {
          setCurrentPlace((prev) => prev + 1);
        }
      }
    }, [searchPlaceResults, currentPlace]),
    changeCurrentPlace: useCallback((position: number) => {
      setCurrentPlace(position);
    }, []),
  };

  return [
    {
      currentPlace,
      searchPlaceResults,
      folderResults,
    },
    actions,
  ];
};

export default useSearchMaps;

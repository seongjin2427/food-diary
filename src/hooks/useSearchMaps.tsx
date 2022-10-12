import { useState, useCallback, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  getSearchPlacesBySearchWord,
  getSearchPlacesBySearchWordSearchResultData,
} from '@/api/diary';
import { searchBySearchWord } from '@/store/search/searchSlice';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';

export interface SearchMapsType {
  currentPlace: number;
  currentFolder: number | undefined;
  searchPlaceResults: getSearchPlacesBySearchWordSearchResultData[] | undefined;
  folderResults: FolderSliceFolderType[] | undefined;
}

export interface SearchMapsActionType {
  setPrevPlace: () => void;
  setNextPlace: () => void;
  changeCurrentPlace: (n: number) => void;
  changeCurrentFolder: (n: number) => void;
}

const useSearchMaps = (): [SearchMapsType, SearchMapsActionType] => {
  const { searchWord, searchOption } = useAppSelector(({ search }) => search);

  const [currentPlace, setCurrentPlace] = useState<number>(0);
  const [searchPlaceResults, setSearchPlaceResults] = useState<
    getSearchPlacesBySearchWordSearchResultData[] | undefined
  >([]);

  const [currentFolder, setCurrentFolder] = useState<number>();
  const [folderResults, setFolderResults] = useState<FolderSliceFolderType[] | undefined>([]);

  useQuery(['searchPlaceResult', searchWord], () => getSearchPlacesBySearchWord(searchWord), {
    refetchOnWindowFocus: false,
    onSuccess: (searchedData) => {
      setSearchPlaceResults(searchedData?.places);
      setFolderResults(searchedData?.folder);
    },
  });

  const actions: SearchMapsActionType = {
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
    changeCurrentFolder: useCallback(
      (n: number) => {
        setCurrentFolder(n);
      },
      [currentFolder],
    ),
  };

  return [
    {
      currentPlace,
      currentFolder,
      searchPlaceResults,
      folderResults,
    },
    actions,
  ];
};

export default useSearchMaps;

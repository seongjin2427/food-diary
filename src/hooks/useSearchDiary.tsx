import { useQuery } from '@tanstack/react-query';
import { useState, useCallback, useEffect } from 'react';

import { getSearchDiaryBySearchWord, SearchedDiaryType } from '@/api/diary';
import { useAppDispatch, useAppSelector } from '@/store/index';
import { selectSearchDate } from '@/store/search/searchSlice';
export interface SearchDiaryType {
  prevDate: string;
  nextDate: string;
  searchDiaryResults: SearchedDiaryType[] | undefined;
}

export interface SearchDiaryActionType {
  setSelectDate: (v: { name: 'prevDate' | 'nextDate'; date: Date }) => void;
}

const useSearchDiary = (): [SearchDiaryType, SearchDiaryActionType] => {
  const dispatch = useAppDispatch();
  const { searchWord, prevDate, nextDate } = useAppSelector(({ search }) => search);

  const [searchDiaryResults, setSearchDiaryResults] = useState<SearchedDiaryType[] | undefined>([]);

  useQuery(
    ['searchDiaryResult', searchWord],
    () =>
      getSearchDiaryBySearchWord({
        nextDate: new Date(nextDate),
        prevDate: new Date(prevDate),
        searchWord,
      }),
    {
      refetchOnWindowFocus: false,
      onSuccess: (searchedData) => {
        setSearchDiaryResults(searchedData);
      },
    },
  );

  useEffect(() => {
    if (new Date(prevDate) > new Date(nextDate)) {
      dispatch(selectSearchDate({ name: 'prevDate', date: nextDate.toString() }));
    }
  }, [nextDate, prevDate]);

  const states = {
    prevDate,
    nextDate,
    searchDiaryResults,
  };

  const actions: SearchDiaryActionType = {
    setSelectDate: useCallback(
      ({ name, date }) => {
        dispatch(selectSearchDate({ name, date: date.toString() }));
      },
      [prevDate, nextDate],
    ),
  };

  return [states, actions];
};

export default useSearchDiary;

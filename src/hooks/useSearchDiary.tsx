import { useState, useCallback, ChangeEvent } from 'react';

export interface SearchDiaryType {
  open: boolean;
  searchWord: string;
  searchOption: string;
}

export interface SearchDiaryActionType {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  selectSearchOption: (e: string) => void;
  onToggleOpen: () => void;
}

const useSearchDiary = (): [SearchDiaryType, SearchDiaryActionType] => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchOption, setSearchOption] = useState<string>('all');

  const actions: SearchDiaryActionType = {
    onSearch: useCallback(
      ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setSearchWord(value);
      },
      [searchWord],
    ),
    selectSearchOption: useCallback(
      (select: string) => {
        setSearchOption(select);
        setOpen(false);
      },
      [open],
    ),
    onToggleOpen: useCallback(() => {
      setOpen(!open);
    }, []),
  };

  return [{ open, searchWord, searchOption }, actions];
};

export default useSearchDiary;

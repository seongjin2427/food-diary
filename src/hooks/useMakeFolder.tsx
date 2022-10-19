import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

import { addFolderApi } from '@/api/diary';
import { addFolder } from '@/store/diary/folderSlice';
import { useAppDispatch, useAppSelector } from '@/store/index';
import { IconKeySet } from '@/components/shared/SVGIcon';
import { IconColorKeyType } from '@/styles/theme';

interface MakeFolderStates {
  inputMode: boolean;
  newFolderTitle: string;
}

interface MakeFolderActions {
  setInputMode: Dispatch<SetStateAction<boolean>>;
  setNewFolderTitle: Dispatch<SetStateAction<string>>;
  onChangeNewTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickNewFolderInfo: (i: IconKeySet, c: IconColorKeyType) => void;
}

const useMakeFolder = (): [MakeFolderStates, MakeFolderActions] => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { searchWord } = useAppSelector(({ search }) => search);

  const mutation = useMutation(addFolderApi, {
    onSuccess() {
      queryClient.invalidateQueries(['folders']);
      queryClient.invalidateQueries(['searchPlaceResult', searchWord]);
    },
  });

  const [inputMode, setInputMode] = useState<boolean>(false);
  const [newFolderTitle, setNewFolderTitle] = useState<string>('');

  const states = {
    inputMode,
    newFolderTitle,
  };

  const actions = {
    setInputMode,
    setNewFolderTitle,
    onChangeNewTitle: useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setNewFolderTitle(value);
    }, []),
    onClickNewFolderInfo: useCallback(
      (icon: IconKeySet, color: IconColorKeyType) => {
        dispatch(addFolder({ icon, color, title: newFolderTitle }));
        mutation.mutate({ icon, color, title: newFolderTitle, places: [] });
        setNewFolderTitle('');
        setInputMode(false);
      },
      [newFolderTitle],
    ),
  };

  return [states, actions];
};

export default useMakeFolder;

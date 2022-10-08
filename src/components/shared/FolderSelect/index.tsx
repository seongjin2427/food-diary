import { memo, useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useAppDispatch, useAppSelector } from '@/store/index';
import {
  addFolder,
  addPlaceInFolder,
  FolderSliceFolderType,
  replaceFolders,
} from '@/store/diary/folderSlice';
import { addFolderApi, getFolderApi } from '@/api/diary';
import { SearchResultType } from '@/hooks/useSearchPlace';
import MakeFolder from '@/components/shared/MakeFolder';
import SVGIcon, { IconKeySet } from '@/components/shared/SVGIcon';
import { IconColorKeyType } from '@/styles/theme';
import * as S from './FolderSelect.styled';

interface FolderType {
  index: number;
  title: string;
  color: IconColorKeyType;
  icon: IconKeySet;
}

interface FolderSelectProps {
  place: SearchResultType;
}

const FolderSelect = ({ place }: FolderSelectProps) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const folders = useAppSelector(({ folder }) => folder.folders);

  const fetchedFolder = useQuery(['folders'], getFolderApi, {
    refetchOnWindowFocus: false,
    onSuccess: (fetchedFolders: FolderSliceFolderType[]) => {
      dispatch(replaceFolders(fetchedFolders));
    },
    onError: (err) => {
      console.log(err);
      dispatch(replaceFolders([]));
    },
  });

  const mutation = useMutation(addFolderApi, {
    onSuccess(data) {
      queryClient.invalidateQueries(['folders']);
    },
  });

  const [selectedFolder, setSelectedFolder] = useState<FolderType | undefined>(undefined);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [inputMode, setinputMode] = useState<boolean>(false);
  const [newFolderTitle, setNewFolderTitle] = useState<string>('');

  useEffect(() => {
    if (!selectedFolder) {
      const index = folders.findIndex(({ places }) => places.find((p) => p.id === place.id));

      if (index >= 0) {
        setSelectedFolder({
          index,
          ...folders[index],
        });
      }
    }
  }, [selectedFolder, folders]);

  const onClickOpenSelect = useCallback(() => {
    setSelectOpen((prev) => !prev);
    setinputMode(false);
  }, []);

  const onClickSelectFolder = useCallback((folder: FolderType) => {
    const { index } = folder;
    setSelectedFolder(folder);
    dispatch(addPlaceInFolder({ index, place }));
    onReset();
    setNewFolderTitle('');
  }, []);

  const onClickConvertInputMode = useCallback(() => {
    setinputMode(true);
  }, []);

  const onClickBackdrop = useCallback(() => {
    onReset();
  }, []);

  const onReset = useCallback(() => {
    setinputMode(false);
    setSelectOpen(false);
  }, []);

  const onChangeNewTitle = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setNewFolderTitle(value);
  }, []);

  const onClickNewFolderInfo = useCallback(
    (icon: IconKeySet, color: IconColorKeyType) => {
      dispatch(addFolder({ icon, color, title: newFolderTitle }));
      mutation.mutate({ icon, color, title: newFolderTitle, places: [] });
      setNewFolderTitle('');
      setinputMode(false);
    },
    [newFolderTitle],
  );

  return (
    <S.Container>
      <S.Backdrop onClick={onClickBackdrop} isOpen={selectOpen} />
      <S.SelectContainer>
        <S.SelectTitle onClick={onClickOpenSelect} isOpen={selectOpen}>
          {selectedFolder ? (
            <S.SelectListIcon selectColor={selectedFolder.color}>
              <SVGIcon icon={selectedFolder?.icon} width='1rem' height='1rem' />
            </S.SelectListIcon>
          ) : (
            <S.SelectListTitle>
              <SVGIcon icon='FolderIcon' width='1.5rem' height='1rem' />
            </S.SelectListTitle>
          )}
          <SVGIcon icon='ChevronDownIcon' width='1rem' height='1rem' />
        </S.SelectTitle>
        <S.SelectListUl isOpen={selectOpen}>
          {folders.map(({ color, icon, title }, index) => (
            <S.SelectListLi
              key={index}
              value={title}
              onClick={() => onClickSelectFolder({ color, icon, title, index })}
            >
              <S.SelectListIcon selectColor={color}>
                <SVGIcon icon={icon} width='1rem' height='1rem' />
              </S.SelectListIcon>
              <S.SelectListTitle>{title}</S.SelectListTitle>
              {selectedFolder?.index === index && (
                <SVGIcon icon='CheckIcon' width='1rem' height='1rem' />
              )}
            </S.SelectListLi>
          ))}
          {inputMode ? (
            <MakeFolder
              onChangeNewTitle={onChangeNewTitle}
              onClickNewFolderInfo={onClickNewFolderInfo}
              newFolderTitle={newFolderTitle}
            />
          ) : (
            <S.SelectListLi isPlus onClick={onClickConvertInputMode}>
              <S.SelectListIcon>
                <SVGIcon icon='CirclePlusIcon' width='1.125rem' height='1.125rem' />
              </S.SelectListIcon>
              <S.SelectListTitle>새 폴더</S.SelectListTitle>
            </S.SelectListLi>
          )}
        </S.SelectListUl>
      </S.SelectContainer>
    </S.Container>
  );
};

export default memo(FolderSelect);

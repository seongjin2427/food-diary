import { memo, useState, useCallback, ChangeEvent, useEffect } from 'react';
import { useQuery, QueryClient } from '@tanstack/react-query';

import { useAppDispatch, useAppSelector } from '@/store/index';
import {
  addFolder,
  addPlaceInFolder,
  FolderSliceFolderType,
  replaceFolders,
} from '@/store/diary/folderSlice';
import { getFolderApi } from '@/api/diary';
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
  const queryClient = new QueryClient();
  const dispatch = useAppDispatch();
  const folders = useAppSelector(({ folder }) => folder.folders);

  const getSelectedFolder = useCallback(() => {
    const index = folders.findIndex(
      ({ places }) => !!places.find((p) => p.address_name === place.address_name),
    );
    if (index >= 0) {
      return {
        index,
        ...folders[index],
      };
    }
    console.log(place);
    console.log('getSelectedFolder', index);
    return;
  }, [folders]);

  const { data } = useQuery(['folders'], getFolderApi, {
    refetchOnWindowFocus: false,
    onSuccess: (fetchedFolders: FolderSliceFolderType[]) => {
      dispatch(replaceFolders(fetchedFolders));
      queryClient.invalidateQueries(['folders']);
    },
    onError: (err) => {
      console.log(err);
      dispatch(replaceFolders([]));
    },
  });

  const [selectedFolder, setSelectedFolder] = useState<FolderType | undefined>(getSelectedFolder());
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [inputMode, setinputMode] = useState<boolean>(false);
  const [newFolderTitle, setNewFolderTitle] = useState<string>('');

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
      setinputMode(false);
      setNewFolderTitle('');
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

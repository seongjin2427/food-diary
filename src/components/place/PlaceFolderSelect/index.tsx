import { memo, useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

import { getFolderApi } from '@/api/diary';
import useMakeFolder from '@/hooks/useMakeFolder';
import { SearchResultType } from '@/hooks/useSearchPlace';
import MakeFolder from '@/components/maps/MakeFolder';
import SVGIcon, { IconKeySet } from '@/components/shared/SVGIcon';
import { useAppDispatch, useAppSelector } from '@/store/index';
import { addPlaceInFolder, FolderSliceFolderType, replaceFolders } from '@/store/diary/folderSlice';
import { IconColorKeyType } from '@/styles/theme';
import * as S from './PlaceFolderSelect.styled';
import { createPlace, updateFolder } from '@/api/place';
import Spinner from '@/components/shared/Spinner';

interface PlaceFolderType {
  index: number;
  title: string;
  color: IconColorKeyType;
  icon: IconKeySet;
}

interface PlaceFolderSelectProps {
  place: SearchResultType;
  right?: boolean;
}

const PlaceFolderSelect = ({ place, right }: PlaceFolderSelectProps) => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector(({ folder }) => folder.folders);
  const [
    { inputMode, newFolderTitle },
    { onChangeNewTitle, onClickNewFolderInfo, setNewFolderTitle, setInputMode },
  ] = useMakeFolder();

  useQuery(['folders'], getFolderApi, {
    refetchOnWindowFocus: false,
    onSuccess: (fetchedFolders: FolderSliceFolderType[]) => {
      const mapped = fetchedFolders.map((p, index) => ({ index, ...p }));
      const filtered = mapped.filter((m) => m.places.find((p) => p.id === place.id));
      setSelectedFolder(filtered);
      dispatch(replaceFolders(fetchedFolders));
    },
    onError: (err) => {
      console.log(err);
      dispatch(replaceFolders([]));
    },
  });

  const { isLoading, mutate } = useMutation(createPlace);
  const updateFolderMutation = useMutation(updateFolder);

  const [selectedFolder, setSelectedFolder] = useState<PlaceFolderType[] | undefined>(undefined);
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  const onClickOpenSelect = useCallback(() => {
    setSelectOpen((prev) => !prev);
    setInputMode(false);
  }, []);

  const onClickSelectFolder = useCallback(
    (folder: PlaceFolderType) => {
      const { index } = folder;

      setSelectedFolder((prev) => {
        if (prev) {
          const found = prev.find((p) => p.index === index);
          if (found) return [...prev.filter((p) => p.index !== index)];
          else return [...prev, { ...folder }];
        }
      });
      dispatch(addPlaceInFolder({ index, place }));
      setNewFolderTitle('');
    },
    [selectedFolder, folders],
  );

  const onClickConvertInputMode = () => setInputMode(true);

  const onClickBackdrop = () => {
    setInputMode(false);
    setSelectOpen(false);
    mutate(place);
    updateFolderMutation.mutate({ folders, id: place.id });
  };

  return (
    <S.Container>
      <S.Backdrop onClick={onClickBackdrop} isOpen={selectOpen} />
      <S.SelectContainer>
        {isLoading ? (
          <Spinner color='lightcoral' size='2rem' speed='1' />
        ) : (
          <>
            <SVGIcon icon='CirclePlusIcon' width='2rem' height='2rem' onClick={onClickOpenSelect} />
            <S.SelectTitle>
              {selectedFolder &&
                selectedFolder.length > 0 &&
                selectedFolder.map(({ index, icon, color }) => (
                  <S.SelectListIcon key={index} selectColor={color}>
                    <SVGIcon icon={icon} width='2rem' height='2rem' />
                  </S.SelectListIcon>
                ))}
            </S.SelectTitle>
          </>
        )}
        <S.SelectListUl isOpen={selectOpen} right={right}>
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
              {selectedFolder && !!selectedFolder.find((s) => s.index === index) && (
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

export default memo(PlaceFolderSelect);

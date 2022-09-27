import { useState, useCallback, useRef } from 'react';
import SVGIcon, { IconKeySet } from '@/components/shared/SVGIcon';

import { FOLDER_COLOR_SET, FOLDER_ICON_SET } from '@/constants/folder';
import { IconColorKeyType } from '@/styles/theme';
import * as S from './FolderSelect.styled';

interface FolderType {
  id: string;
  title: string;
  color: IconColorKeyType;
  icon: IconKeySet;
}

const FolderSelect = () => {
  const [folders, setFolders] = useState<FolderType[]>([
    {
      id: '1',
      title: '맛집',
      color: 'red',
      icon: 'PushPinIcon',
    },
    {
      id: '2',
      title: '식당',
      color: 'green',
      icon: 'RestaurantIcon',
    },
    {
      id: '3',
      title: '카페',
      color: 'blue',
      icon: 'CupIcon',
    },
  ]);
  const [selectedFolder, setSelectedFolder] = useState<FolderType>();
  const [selectOpen, setSelectOpen] = useState<boolean>(false);
  const [inputMode, setinputMode] = useState<boolean>(false);

  const newFolderRef = useRef<HTMLInputElement>(null);

  const onClickOpenSelect = useCallback(() => {
    setSelectOpen((prev) => !prev);
    if (selectOpen) {
      setinputMode(false);
    }
  }, []);

  const onClickSelectFolder = useCallback((folder: FolderType) => {
    setSelectedFolder(folder);
    onReset();
    if (newFolderRef.current) newFolderRef.current.value = '';
  }, []);

  const onClickConvertInputMode = useCallback(() => {
    setinputMode(true);
    if (inputMode) {
      newFolderRef.current?.focus();
    }
  }, []);

  const onReset = useCallback(() => {
    setinputMode(false);
    setSelectOpen(false);
  }, []);

  return (
    <S.Container>
      <S.SelectTitle onClick={onClickOpenSelect}>
        {selectedFolder ? (
          <>
            <S.SelectListIcon selectColor={selectedFolder.color}>
              <SVGIcon icon={selectedFolder?.icon} width='1rem' height='1rem' />
            </S.SelectListIcon>
            <S.SelectListTitle>{selectedFolder.title}</S.SelectListTitle>
          </>
        ) : (
          <S.SelectListTitle>폴더를 선택하세요</S.SelectListTitle>
        )}
        <SVGIcon icon='ChevronDownIcon' width='1rem' height='1rem' />
      </S.SelectTitle>
      <S.SelectListUl isOpen={selectOpen}>
        {folders.map(({ id, color, icon, title }) => (
          <S.SelectListLi
            key={title}
            value={title}
            onClick={() => onClickSelectFolder({ id, color, icon, title })}
          >
            <S.SelectListIcon selectColor={color}>
              <SVGIcon icon={icon} width='1rem' height='1rem' />
            </S.SelectListIcon>
            <S.SelectListTitle>{title}</S.SelectListTitle>
            {selectedFolder?.id === id && <SVGIcon icon='CheckIcon' width='1rem' height='1rem' />}
          </S.SelectListLi>
        ))}
        {inputMode ? (
          <>
            <S.NewFolderLi>
              <S.SelectListIcon>
                <SVGIcon icon='CirclePlusIcon' width='1.125rem' height='1.125rem' />
              </S.SelectListIcon>
              <S.NewFolderInput ref={newFolderRef} />
            </S.NewFolderLi>
            <S.NewFolderLi>
              {FOLDER_ICON_SET.map((icon) => (
                <S.FolderIcon key={icon}>
                  <SVGIcon icon={icon} width='1.5rem' height='1.5rem' />
                </S.FolderIcon>
              ))}
            </S.NewFolderLi>
            <S.NewFolderLi>
              {FOLDER_COLOR_SET.map((color) => (
                <S.FolderColor key={color} selectColor={color} />
              ))}
            </S.NewFolderLi>
          </>
        ) : (
          <S.SelectListLi isPlus onClick={onClickConvertInputMode}>
            <S.SelectListIcon>
              <SVGIcon icon='CirclePlusIcon' width='1.125rem' height='1.125rem' />
            </S.SelectListIcon>
            <S.SelectListTitle>새 폴더</S.SelectListTitle>
          </S.SelectListLi>
        )}
      </S.SelectListUl>
    </S.Container>
  );
};

export default FolderSelect;

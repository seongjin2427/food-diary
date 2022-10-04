import { useState, useCallback, ChangeEvent } from 'react';

import { FOLDER_COLOR_SET, FOLDER_ICON_SET } from '@/constants/folder';
import SVGIcon, { IconKeySet } from '@/components/shared/SVGIcon';
import { IconColorKeyType } from '@/styles/theme';
import * as S from './MakeFolder.styled';

interface MakeFolderProps {
  newFolderTitle: string;
  onChangeNewTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickNewFolderInfo: (icon: IconKeySet, color: IconColorKeyType) => void;
}

const MakeFolder = ({
  newFolderTitle,
  onChangeNewTitle,
  onClickNewFolderInfo,
}: MakeFolderProps) => {
  const [selectedColor, setSelectedColor] = useState<IconColorKeyType>('black');
  const [selectedIcon, setSelectedIcon] = useState<IconKeySet>('RestaurantIcon');

  const onClickSelectIcon = useCallback((icon: IconKeySet) => {
    setSelectedIcon(icon);
  }, []);

  const onClickSelectColor = useCallback((color: IconColorKeyType) => {
    setSelectedColor(color);
  }, []);

  return (
    <>
      <S.NewFolderLi>
        <S.NewFolderInput onChange={onChangeNewTitle} />
        <S.SelectButton
          onClick={() => onClickNewFolderInfo(selectedIcon, selectedColor)}
          disabled={!newFolderTitle}
        >
          확인
        </S.SelectButton>
      </S.NewFolderLi>
      <S.NewFolderLi>
        {FOLDER_ICON_SET.map((icon) => (
          <S.FolderIcon key={icon}>
            <SVGIcon
              icon={icon}
              width='1.5rem'
              height='1.5rem'
              onClick={() => onClickSelectIcon(icon)}
            />
            {selectedIcon === icon && (
              <SVGIcon
                icon='CheckIcon'
                width='1.5rem'
                height='1.5rem'
                onClick={() => onClickSelectIcon(icon)}
              />
            )}
          </S.FolderIcon>
        ))}
      </S.NewFolderLi>
      <S.NewFolderLi>
        {FOLDER_COLOR_SET.map((color) => (
          <S.FolderColorArea key={color}>
            <S.FolderColor selectColor={color} onClick={() => onClickSelectColor(color)} />
            {selectedColor === color && (
              <SVGIcon
                icon='CheckIcon'
                width='1.5rem'
                height='1.5rem'
                onClick={() => onClickSelectColor(color)}
              />
            )}
          </S.FolderColorArea>
        ))}
      </S.NewFolderLi>
    </>
  );
};

export default MakeFolder;
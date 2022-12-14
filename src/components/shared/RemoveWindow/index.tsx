import { useLongPress } from 'use-long-press';
import React, { MouseEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeFolderApi } from '@/api/folder';
import { FolderSliceFolderType } from '@/store/diary/folderSlice';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './RemoveWindow.styled';

interface RemoveWindow {
  idx: number;
  folder: FolderSliceFolderType | undefined;
  currentFolder: number | undefined;
  fn: (n: number) => void;
}

const RemoveWindow = ({ currentFolder, folder, fn, idx }: RemoveWindow) => {
  if (!folder) return null;

  const queryClient = useQueryClient();
  const { icon, color, fid, title } = folder;

  const mutation = useMutation(removeFolderApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(['folders']);
      alert('정상적으로 삭제되었습니다!');
    },
  });

  const longPress = useLongPress(() => {
    if (confirm(`${title} 폴더를 삭제하시겠습니까?`) && fid) {
      mutation.mutate(fid);
    }
  });

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  return (
    <S.FolderIconItem
      key={fid}
      selectedColor={color}
      onClick={() => fn(idx)}
      onContextMenu={onContextMenu}
      {...longPress()}
    >
      <SVGIcon icon={icon} width='1.25rem' height='1.25rem' />
      {currentFolder === idx && (
        <S.CheckIcon>
          <SVGIcon icon='CheckIcon' width='1.75rem' height='1.75rem' />
        </S.CheckIcon>
      )}
    </S.FolderIconItem>
  );
};

export default RemoveWindow;

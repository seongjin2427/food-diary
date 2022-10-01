/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { Editor } from '@tiptap/react';

import { uploadImageFile } from '@/api/diary';
import { useAppDispatch } from '@/store/index';
import { addImage } from '@/store/diary/diarySlice';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './EditorFooter.styled';

interface EditorFooterProps {
  editor: Editor;
}

const EditorFooter = ({ editor }: EditorFooterProps) => {
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onClickAddImage = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  const onChangeImageUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const imageFile = await uploadImageFile(e.target.files[0]);
        imageInputRef.current!.value = '';
        if (imageFile) {
          const { img_id, src, fileName } = imageFile;
          editor
            ?.chain()
            .focus()
            .insertContent(`<custom-image id=${img_id} src=${src} />`)
            .createParagraphNear()
            .run();

          dispatch(addImage({ id: img_id, src }));
        }
      }
    },
    [editor],
  );

  return (
    <S.Container>
      <SVGIcon icon='ImageAddIcon' width='2rem' height='2rem' onClick={onClickAddImage} />
      <input
        type='file'
        onChange={onChangeImageUpload}
        ref={imageInputRef}
        accept='image/gif, image/jpeg, image/jpg, image/png'
        hidden
      />
    </S.Container>
  );
};

export default EditorFooter;

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

const PERMITTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const LIMIT_SIZE = 5 * 1024 * 1024;

const EditorFooter = ({ editor }: EditorFooterProps) => {
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onClickAddImage = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  const onChangeImageUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const targetImage = e.target.files[0];

        try {
          if (!PERMITTED_IMAGE_TYPES.includes(targetImage.type)) {
            throw new Error('형식에 맞지 않는 이미지입니다. 다시 시도해주세요.');
          }

          if (LIMIT_SIZE < targetImage.size) {
            throw new Error('5MB 이하의 이미지만 업로드가 가능합니다.\n다시 시도해주세요.');
          }

          const imageFile = await uploadImageFile(targetImage);
          imageInputRef.current!.value = '';

          if (imageFile) {
            const { img_id, src } = imageFile;
            editor
              ?.chain()
              .focus()
              .insertContent(`<custom-image id=${img_id} src=${src} />`)
              .createParagraphNear()
              .run();

            dispatch(addImage({ img_id, src }));
          }
        } catch (e) {
          const error = e as Error;
          alert(error.message);
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

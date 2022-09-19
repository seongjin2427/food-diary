import { uploadImageFile } from '@/api/diary';
import SVGIcon from '@/components/shared/SVGIcon';
import { Editor } from '@tiptap/react';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import * as S from './EditorFooter.styled';

interface EditorFooterProps {
  editor: Editor;
}

const EditorFooter = ({ editor }: EditorFooterProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onClickAddImage = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  const onChangeImageUpload = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageFile = await uploadImageFile(e.target.files[0]);
      imageInputRef.current!.value = '';
      if (imageFile) {
        editor
          .chain()
          .focus()
          .insertContent(`<custom-image src=${imageFile.src} id=${imageFile.id} />`)
          .createParagraphNear()
          .run();
      }
    }
  }, []);

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

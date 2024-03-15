import React from 'react';

import { Editor, EditorContent } from '@tiptap/react';
import * as S from './EditorBody.styled';

interface EditorBodyProps {
  editor: Editor;
}
const EditorBody = ({ editor }: EditorBodyProps) => {
  return (
    <S.Container>
      <EditorContent editor={editor} />
    </S.Container>
  );
};

export default EditorBody;

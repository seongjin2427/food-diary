import React, { useContext } from 'react';
import { Editor, EditorContent } from '@tiptap/react';

import * as S from './EditorBody.styled';
import { EditorContext } from '@/components/shared/Editor/context/editorContext';

interface EditorBodyProps {
  editor: Editor;
}
const EditorBody = ({ editor }: EditorBodyProps) => {
  const { editorRef } = useContext(EditorContext);
  return (
    <S.Container>
      <EditorContent editor={editor} ref={editorRef} />
    </S.Container>
  );
};

export default EditorBody;

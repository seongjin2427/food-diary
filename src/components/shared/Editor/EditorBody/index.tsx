import React, { useContext } from 'react';
import { Editor, EditorContent } from '@tiptap/react';
import { EditorContext } from '@/components/shared/Editor/context/editorContext';

import * as S from './EditorBody.styled';

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

/* eslint-disable  @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { setDiaryByName } from '@/store/diary/diarySlice';
import { useAppDispatch } from '@/store/index';
import { PureEditorContent } from '@tiptap/react';
import React, { createContext, ReactNode, RefObject, useRef } from 'react';

interface EditorContextType {
  editorRef: RefObject<PureEditorContent> | null;
  storeDiary: () => void;
}

export const EditorContext = createContext<EditorContextType>({
  editorRef: null,
  storeDiary: () => {},
});

interface EditorProviderProps {
  children: ReactNode;
}

const EditorProvider = ({ children }: EditorProviderProps) => {
  const dispatch = useAppDispatch();
  const editorRef = useRef<PureEditorContent>(null);

  const storeDiary = () => {
    const value = editorRef.current!.props.editor!.getHTML();
    dispatch(setDiaryByName({ name: 'content', value }));
  };

  const provided = {
    editorRef,
    storeDiary,
  };

  return <EditorContext.Provider value={provided}>{children}</EditorContext.Provider>;
};

export default EditorProvider;

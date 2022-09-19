/* eslint-disable @typescript-eslint/no-empty-function */

import { PureEditorContent } from '@tiptap/react';
import { createContext, ReactNode, Ref, useRef } from 'react';

interface EditorContextType {
  titleRef: Ref<HTMLInputElement> | null;
  editorRef: Ref<PureEditorContent> | null;
  storeDiary: () => void;
}

export const EditorContext = createContext<EditorContextType>({
  titleRef: null,
  editorRef: null,
  storeDiary: () => {},
});

interface EditorProviderProps {
  children: ReactNode;
}

const EditorProvider = ({ children }: EditorProviderProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<PureEditorContent>(null);
  const storeDiary = () => {
    console.log(editorRef.current?.props.editor?.getHTML());
  };

  return (
    <EditorContext.Provider
      value={{
        titleRef,
        editorRef,
        storeDiary,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;

/* eslint-disable @typescript-eslint/no-empty-function */

import { setDiaryContent } from '@/store/diary';
import { useAppDispatch } from '@/store/index';
import { PureEditorContent } from '@tiptap/react';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  Ref,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface EditorContextType {
  titleRef: Ref<HTMLInputElement>;
  editorRef: Ref<PureEditorContent> | null;
  storeDiary: () => void;
  thumbnail: {
    thumbnail: string | null;
    setThumbnail: Dispatch<SetStateAction<string | null>>;
  };
  image: {
    images: string[];
    setImages: Dispatch<SetStateAction<string[]>>;
  };
  completeBool: boolean;
}

export const EditorContext = createContext<EditorContextType>({
  titleRef: null,
  editorRef: null,
  storeDiary: () => {},
  thumbnail: {
    thumbnail: null,
    setThumbnail: () => {},
  },
  image: {
    images: [],
    setImages: () => {},
  },
  completeBool: false,
});

interface EditorProviderProps {
  children: ReactNode;
}

const EditorProvider = ({ children }: EditorProviderProps) => {
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<PureEditorContent>(null);
  const [thumbnail, setThumbnail] = useState<string | null>('');
  const [images, setImages] = useState<string[]>([]);
  const [completeBool, setCompleteBool] = useState<boolean>(false);

  const storeDiary = useCallback(() => {
    const editorContent = editorRef.current!.props.editor!.getHTML();
    const title = titleRef.current!.value;
    if (title) {
      const content = {
        title,
        content: editorContent,
        images,
        thumbnail,
      };
      console.log('content', content);
      dispatch(setDiaryContent(content));
    }
  }, [titleRef, editorRef, images, thumbnail]);

  return (
    <EditorContext.Provider
      value={{
        titleRef,
        editorRef,
        storeDiary,
        thumbnail: {
          thumbnail,
          setThumbnail,
        },
        image: {
          images,
          setImages,
        },
        completeBool,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default React.memo(EditorProvider);

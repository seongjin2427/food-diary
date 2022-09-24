/* eslint-disable  @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { setDiaryContent } from '@/store/diary';
import { useAppDispatch } from '@/store/index';
import { PureEditorContent } from '@tiptap/react';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from 'react';

interface EditorContextType {
  titleRef: RefObject<HTMLInputElement> | null;
  editorRef: RefObject<PureEditorContent> | null;
  storeDiary: () => void;
  thumbnail: string | null;
  setThumbnail: Dispatch<SetStateAction<string | null>>;
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}

export const EditorContext = createContext<EditorContextType>({
  titleRef: null,
  editorRef: null,
  storeDiary: () => {},
  thumbnail: null,
  setThumbnail: () => {},
  images: [],
  setImages: () => {},
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

  const storeDiary = () => {
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
  };

  const provided = useMemo(
    () => ({
      titleRef,
      editorRef,
      storeDiary,
      thumbnail,
      setThumbnail,
      images,
      setImages,
    }),
    [titleRef, editorRef, storeDiary, thumbnail, setThumbnail, images, setImages],
  );

  return <EditorContext.Provider value={provided}>{children}</EditorContext.Provider>;
};

export default React.memo(EditorProvider);

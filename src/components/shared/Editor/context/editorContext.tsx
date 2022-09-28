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

interface ImageType {
  id: string;
  src: string;
}

interface EditorContextType {
  editorRef: RefObject<PureEditorContent> | null;
  storeDiary: () => void;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  thumbnail: string | null;
  setThumbnail: Dispatch<SetStateAction<string | null>>;
  images: ImageType[];
  setImages: Dispatch<SetStateAction<ImageType[]>>;
}

export const EditorContext = createContext<EditorContextType>({
  editorRef: null,
  storeDiary: () => {},
  title: '',
  setTitle: () => {},
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
  const editorRef = useRef<PureEditorContent>(null);
  const [thumbnail, setThumbnail] = useState<string | null>('');
  const [images, setImages] = useState<ImageType[]>([]);
  const [title, setTitle] = useState<string>('');

  const storeDiary = () => {
    const editorContent = editorRef.current!.props.editor!.getHTML();

    if (title) {
      const content = {
        title,
        content: editorContent,
        images,
        thumbnail,
      };
      dispatch(setDiaryContent(content));
    }
  };

  const provided = useMemo(
    () => ({
      editorRef,
      storeDiary,
      title,
      setTitle,
      thumbnail,
      setThumbnail,
      images,
      setImages,
    }),
    [editorRef, storeDiary, thumbnail, setThumbnail, images, setImages],
  );

  return <EditorContext.Provider value={provided}>{children}</EditorContext.Provider>;
};

export default React.memo(EditorProvider);

/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useContext, useState, SetStateAction } from 'react';
import { useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';

import { useAppSelector } from '@/store/index';
import { EditorContext } from '@/components/shared/Editor/context/editorContext';
import DashBoard from '@/components/shared/Editor/DashBoard';
import EditorBody from '@/components/shared/Editor/EditorBody';
import CustomImage from '@/components/shared/Editor/CustomImage';
import Portal from '@/components/shared/Portal';
import EditorFooter from '@/components/shared/Editor/EditorFooter';
import * as S from './Editor.styled';
import { Dispatch } from 'react';

interface ImageFileType {
  id: string;
  src: string;
}

const Editor = () => {
  const currentPost = useAppSelector(({ diary }) => diary.post);
  const { content } = currentPost;

  const { images, setImages } = useContext(EditorContext);

  const [editorContent, setEditorContent] = useState<string>('');
  const [readyToRemoveImages, setReadyToRemoveImages] = useState<ImageFileType[]>([]);

  useEffect(() => {
    if (images.length > 0) {
      console.log('images', images);
      console.log('readyToRemoveImages', readyToRemoveImages);
      images.forEach(({ id, src }) => {
        const watchImg = editorContent.includes(src);
        console.log(watchImg);

        if (!watchImg) {
          console.log('false');
          const removedImg = images.find(({ id: nid }) => nid === id);

          if (removedImg) {
            setReadyToRemoveImages((prev) => [...prev, removedImg]);
            setImages((prev) => {
              const next = [...prev];
              return next.filter(({ id: nid }) => nid !== id);
            });
          }
        }
      });
    }
    if (readyToRemoveImages.length > 0) {
      readyToRemoveImages.forEach(({ id, src }) => {
        console.log('true');
        const watchImg = editorContent.includes(src);
        console.log(watchImg);
        if (watchImg) {
          const toRestoreImg = readyToRemoveImages.find(({ id: nid }) => nid === id);
          console.log('toRestoreImg', toRestoreImg);
          if (toRestoreImg) {
            console.log('bbb');
            setImages((prev) => [...prev, toRestoreImg].sort((a, b) => +a.id - +b.id));
            setReadyToRemoveImages((prev) => {
              const next = [...prev];
              return next.filter(({ id: nid }) => nid !== id);
            });
          }
        }
      });
    }
  }, [editorContent, readyToRemoveImages, images]);

  const editor = useEditor({
    extensions: [
      CustomImage,
      StarterKit,
      Underline,
      TextStyle,
      Image,
      Color,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
      Link.configure({
        autolink: true,
      }),
    ],
    content:
      content ||
      `
      <p>일기를 써주세요!</p>
    `,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  return (
    <S.Container>
      <DashBoard editor={editor!}></DashBoard>
      <EditorBody editor={editor!}></EditorBody>
      <Portal>
        <EditorFooter editor={editor!} />
      </Portal>
    </S.Container>
  );
};

export default Editor;

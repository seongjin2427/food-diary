/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
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

import { useAppDispatch, useAppSelector } from '@/store/index';
import {
  addImage,
  addTempImage,
  removeImage,
  removeTempImage,
  setDiaryByName,
} from '@/store/diary/diarySlice';
import DashBoard from '@/components/shared/Editor/DashBoard';
import EditorBody from '@/components/shared/Editor/EditorBody';
import CustomImage from '@/components/shared/Editor/CustomImage';
import Portal from '@/components/shared/Portal';
import EditorFooter from '@/components/shared/Editor/EditorFooter';
import * as S from './Editor.styled';

interface EditorProps {
  editable?: boolean;
}

const Editor = ({ editable }: EditorProps) => {
  const dispatch = useAppDispatch();
  const { content, images, tempImages } = useAppSelector(({ diary }) => diary);
  const [editorContent, setEditorContent] = useState<string>('');

  useEffect(() => {
    if (!editorContent) return;
    dispatch(setDiaryByName({ name: 'content', value: editorContent }));

    if (images.length > 0) {
      images.forEach(({ id, src }) => {
        const watchImg = editorContent.includes(src);
        if (!watchImg) {
          const removedImg = images.find(({ id: nid }) => nid === id);

          if (removedImg) {
            dispatch(addTempImage(removedImg));
            dispatch(removeImage(id));
          }
        }
      });
    }
    if (tempImages.length > 0) {
      tempImages.forEach(({ id, src }) => {
        const watchImg = editorContent.includes(src);

        if (watchImg) {
          const toRestoreImg = tempImages.find(({ id: nid }) => nid === id);

          if (toRestoreImg) {
            dispatch(addImage(toRestoreImg));
            dispatch(removeTempImage(id));
          }
        }
      });
    }
  }, [editorContent, tempImages, images]);

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
    editable: editable,
    content:
      content ||
      `
      <p>일기를 써주세요!</p>
    `,
    onCreate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  return (
    <S.Container>
      {editable && <DashBoard editor={editor!}></DashBoard>}
      <EditorBody editor={editor!}></EditorBody>
      {editable && (
        <Portal>
          <EditorFooter editor={editor!} />
        </Portal>
      )}
    </S.Container>
  );
};

export default Editor;

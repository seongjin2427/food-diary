/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import React from 'react';
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

import DashBoard from '@/components/shared/Editor/DashBoard';
import EditorBody from '@/components/shared/Editor/EditorBody';
import * as S from './Editor.styled';
import CustomImage from '@/components/shared/Editor/CustomImage';
import Portal from '@/components/shared/Portal';
import EditorFooter from '@/components/shared/Editor/EditorFooter';

const Editor = () => {
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
    content: `
      <p>일기를 써주세요!</p>
    `,
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

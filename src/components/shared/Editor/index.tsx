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

import DashBoard from '@/components/shared/Editor/DashBoard';
import EditorBody from '@/components/shared/Editor/EditorBody';
import * as S from './Editor.styled';

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
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
    content: 'Hello World!',
  });
  
  return (
    <S.Container>
      <DashBoard editor={editor!}></DashBoard>
      <EditorBody editor={editor!}></EditorBody>
    </S.Container>
  );
};

export default Editor;

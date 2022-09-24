import React, { useRef, useCallback } from 'react';
import { Editor } from '@tiptap/react';

import {
  editorAlignIcons,
  editorFontIcons,
  editorHeadingIcons,
  editorListIcons,
} from '@/constants/editor';
import SVGIcon from '@/components/shared/SVGIcon';
import * as S from './DashBoard.styled';

interface DashBoardProps {
  editor: Editor;
}
const DashBoard = ({ editor }: DashBoardProps) => {
  const colorPickerRef = useRef<HTMLInputElement>(null);

  const onClickColorPicker = useCallback(() => {
    colorPickerRef.current?.click();
  }, []);

  return (
    <S.Container>
      <S.ButtonBox>
        <S.ButtonArea>
          {editorHeadingIcons.map(({ iconName, level, method, style }) => (
            <SVGIcon
              width='1.75rem'
              height='1.75rem'
              key={iconName}
              icon={iconName}
              onClick={() => editor.chain().focus()[method](level).run()}
              style={{ background: editor?.isActive(style, level) ? 'red' : '' }}
            />
          ))}
          <S.Divider />
          {editorFontIcons.map(({ iconName, method, style }) => (
            <SVGIcon
              key={iconName}
              icon={iconName}
              width='1.675rem'
              height='1.675rem'
              onClick={() => editor.chain().focus()[method]().run()}
              style={{ background: editor?.isActive(style) ? 'red' : '' }}
            />
          ))}
          <S.Divider />
          <S.ColorPickerDiv onClick={onClickColorPicker}>
            <SVGIcon icon='TextIcon' width='1.75rem' height='1.75rem' />
            <S.ColorPicker
              ref={colorPickerRef}
              type='color'
              width='1.75rem'
              height='1.75rem'
              onInput={(e) => editor.chain().focus().setColor(e.currentTarget.value).run()}
              value={editor?.getAttributes('textStyle').color}
            />
          </S.ColorPickerDiv>
          <SVGIcon
            icon='SeparatorIcon'
            width='1.75rem'
            height='1.75rem'
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />
          <S.Divider />
          {editorAlignIcons.map(({ iconName, method }) => (
            <SVGIcon
              key={iconName}
              icon={iconName}
              width='1.75rem'
              height='1.75rem'
              onClick={() => editor.chain().focus().setTextAlign(method).run()}
              style={{
                background: editor?.isActive({ textAlign: method }) ? 'red' : '',
              }}
            />
          ))}
          <S.Divider />
          {editorListIcons.map(({ iconName, method, style }) => (
            <SVGIcon
              key={iconName}
              icon={iconName}
              width='1.75rem'
              height='1.75rem'
              onClick={() => editor.chain().focus()[method]().run()}
              style={{
                background: editor?.isActive(style) ? 'red' : '',
              }}
            />
          ))}
        </S.ButtonArea>
      </S.ButtonBox>
    </S.Container>
  );
};

export default DashBoard;

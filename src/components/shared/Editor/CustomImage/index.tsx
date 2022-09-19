import React, { ChangeEvent, useCallback, useContext } from 'react';
import { mergeAttributes, Node, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

import * as S from './CustomImage.styled';
import { EditorContext } from '@/components/shared/Editor/context/editorContext';

const CustomImage = (props: any) => {
  const {
    thumbnail: { setThumbnail },
  } = useContext(EditorContext);

  const onChangeThumbnail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log('a')
    setThumbnail(prev => e.target.value);
  }, []);

  return (
    <NodeViewWrapper>
      <S.Container>
        <S.CheckBox
          type='radio'
          name='image'
          value={props.node.attrs.id}
          onChange={onChangeThumbnail}
        />
        <S.Image src={props.node.attrs.src} />
      </S.Container>
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: 'customImage',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: '',
      id: '',
    };
  },
  parseHTML() {
    return [{ tag: 'custom-image' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['custom-image', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(CustomImage);
  },
});

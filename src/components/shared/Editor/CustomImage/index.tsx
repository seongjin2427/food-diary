import React, { useCallback, ChangeEvent } from 'react';
import { mergeAttributes, Node, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

import { useAppDispatch, useAppSelector } from '@/store/index';
import { setDiaryByName } from '@/store/diary/diarySlice';
import * as S from './CustomImage.styled';

const CustomImage = (props: any) => {
  const dispatch = useAppDispatch();
  const { thumbnail } = useAppSelector(({ diary }) => diary);

  const onChangeThumbnail = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDiaryByName({ name: 'thumbnail', value }));
  };

  const checkExistThumbnail = useCallback(() => {
    if (+thumbnail === +props.node.attrs.id) return true;
  }, [thumbnail]);

  return (
    <NodeViewWrapper>
      <S.Container>
        <S.CheckBox
          type='radio'
          name='image'
          value={props.node.attrs.id}
          onChange={onChangeThumbnail}
          // checked={undefined}
          defaultChecked={+thumbnail === +props.node.attrs.id}
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

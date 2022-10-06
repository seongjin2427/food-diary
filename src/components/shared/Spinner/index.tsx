import React from 'react';

import * as S from './Spinner.styled';

interface SpinnerProps {
  size: string;
  color: string;
  speed: string;
}

const Spinner = ({ size, color, speed }: SpinnerProps) => {
  return (
    <S.Container>
      <S.SpinnerBody color={color} size={size} speed={speed}></S.SpinnerBody>
    </S.Container>
  );
};

export default Spinner;

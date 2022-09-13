import React from 'react';
import * as S from './WriteDiaryBody.styled';

interface WriteDiayBodyProps {
  slug: string[];
}

const WriteDiayBody = ({ slug }: WriteDiayBodyProps) => {
  const [day, month, year] = slug;

  return (
    <S.Container>
      <S.LetMeknowThePlaceTitle>
        {year}년 {month}월 {day}일에 <br />
        방문하신 장소를 알려주세요!
      </S.LetMeknowThePlaceTitle>
    </S.Container>
  );
};

export default WriteDiayBody;

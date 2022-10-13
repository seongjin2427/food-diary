import { useAppSelector } from '@/store/index';
import React from 'react';

import * as S from './DiarySetting.styled';

const DiarySetting = () => {
  const { nickname, email } = useAppSelector(({ user }) => user);

  return (
    <S.Container>
      <S.Card>
        <S.CardTitle>내 계정</S.CardTitle>
        <S.CardContentContainer>
          <S.CardSubject>사용자 정보</S.CardSubject>
          <S.CardContent>{nickname}</S.CardContent>
        </S.CardContentContainer>
        <S.CardContentContainer>
          <S.CardSubject>계정 정보</S.CardSubject>
          <S.CardContent>{email}</S.CardContent>
        </S.CardContentContainer>
      </S.Card>
      <S.Card>
        <S.CardTitle>앱 설정</S.CardTitle>
        <S.CardContentContainer>
          <S.CardSubject>공지사항</S.CardSubject>
          <S.CardContent></S.CardContent>
        </S.CardContentContainer>
        <S.CardContentContainer>
          <S.CardSubject>문의하기</S.CardSubject>
          <S.CardContent></S.CardContent>
        </S.CardContentContainer>
        <S.CardContentContainer>
          <S.CardSubject>버전정보</S.CardSubject>
          <S.CardContent>v 0.1.0</S.CardContent>
        </S.CardContentContainer>
      </S.Card>
    </S.Container>
  );
};

export default DiarySetting;

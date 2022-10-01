import Image from 'next/image';
import React from 'react';
import loginImage from '@/assets/login/kakao_login_medium_narrow.png';

import * as S from './Login.styled';
import useUserInformation from '@/hooks/useUserInformation';

const Login = () => {
  const [{ login }] = useUserInformation();

  return (
    <S.Container>
      <S.Description>간편하게 로그인하고</S.Description>
      <S.Description>
        <em>음식일기 : 어디서 먹었지</em>
      </S.Description>
      <S.Description>이용하기</S.Description>
      <S.LoginButton onClick={login}>
        <Image src={loginImage} width='200px' height='50px' />
      </S.LoginButton>
    </S.Container>
  );
};

export default Login;

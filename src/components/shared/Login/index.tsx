import Image from 'next/image';
import React from 'react';

import loginImage from '@/assets/login/kakao_login_medium_narrow.png';
import useUserInformation from '@/hooks/useUserInformation';
import * as S from './Login.styled';

const Login = () => {
  const [{ login }] = useUserInformation();

  return (
    <S.Container>
      <Image src={require('../../../assets/img/1.png')} />
      <S.Description>
        간편하게 <em>로그인</em>하고
      </S.Description>
      <S.Description>
        <em>이용하기</em>
      </S.Description>
      <S.LoginButton onClick={login}>
        <Image src={loginImage} width='200px' height='50px' />
      </S.LoginButton>
    </S.Container>
  );
};

export default Login;

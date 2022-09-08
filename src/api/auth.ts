import instance from './instance';

export const kakaoLoginAPI = async () => {
  const result = await instance.get(
    `http://kauth.kakao.com/oauth/authorize/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`,
    // `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REST_API_KEY}`,
  );

  console.log(result);
};

export const kakaoInit = () => {
  const kakao = (window as any).Kakao;
  console.log(kakao);
  if (!kakao.isInitialized()) {
    kakao.init(process.env.NEXT_PUBLIC_JAVASCRIPT_KEY);
  }

  return kakao;
};

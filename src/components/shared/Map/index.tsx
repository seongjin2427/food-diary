import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  useEffect(() => {
    const kakao = window.kakao;
    console.log(kakao);
    const mapContainer = document.getElementById('kakaoMap');
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch('이태원 맛집', (data: any, status: any, pagination: any) => {
      console.log(data, status, pagination);
      if (status === kakao.maps.services.Status.OK) {
        console.log(data);
      }
    });
  }, []);

  return <div id='kakaoMap' style={{ width: '100%', height: '20rem' }} />;
};

export default Map;

import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface PlaceMapProps {
  x: string;
  y: string;
}

const PlaceMap = ({ x, y }: PlaceMapProps) => {
  useEffect(() => {
    const kakao = window.kakao;
    const mapContainer = document.getElementById('placeMap');

    const mapOption = {
      center: new kakao.maps.LatLng(y, x), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const mapTypeControl = new kakao.maps.MapTypeControl();

    map.setDraggable(true);
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    const imageSrc = 'https://cdn-icons-png.flaticon.com/512/46/46350.png';
    const imageSize = new kakao.maps.Size(40, 40);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    const position = {
      title: '',
      latlng: new kakao.maps.LatLng(y, x),
    };

    makeMarker(position.latlng, markerImage);
    function makeMarker(position: string, image: any) {
      new kakao.maps.Marker({
        map,
        position,
        image,
      });
    }
  }, []);

  return <div id='placeMap' style={{ width: '100%', height: '22.5rem', marginBottom: '1rem' }} />;
};

export default PlaceMap;

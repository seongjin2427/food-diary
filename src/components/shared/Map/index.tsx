import { SearchDiaryActionType, SearchDiaryType } from '@/hooks/useSearchDiary';
import { SearchMapsActionType, SearchMapsType } from '@/hooks/useSearchMaps';
import { useEffect } from 'react';

interface GeolocationType {
  coords: GeolocationCoordinates;
}
declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  searchMapsStates: SearchMapsType;
  searchMapsActions: SearchMapsActionType;
}

const Map = ({ searchMapsStates, searchMapsActions }: MapProps) => {
  const { searchPlaceResults, currentPlace } = searchMapsStates;
  const { changeCurrentPlace } = searchMapsActions;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }: GeolocationType) => {
      const kakao = window.kakao;
      const mapContainer = document.getElementById('kakaoMap');

      const mapOption = {
        center: new kakao.maps.LatLng(coords.latitude, coords.longitude), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      map.setDraggable(true);
      // const zoomControl = new kakao.maps.ZoomControl();
      // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      // kakao.maps.event.addListener(map, 'zoom_changed', function () {
      //   console.log('확대, 축소');
      // });// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      const mapTypeControl = new kakao.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      const imageSrc = 'https://cdn-icons-png.flaticon.com/512/46/46350.png';
      const imageSize = new kakao.maps.Size(40, 40);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const position = {
        title: '',
        latlng: new kakao.maps.LatLng(coords.latitude, coords.longitude),
      };

      if (searchPlaceResults && searchPlaceResults.length > 0) {
        // current place
        const { place_name, x, y } = searchPlaceResults[currentPlace];
        (position.title = place_name), (position.latlng = new kakao.maps.LatLng(y, x));

        // all places
        const positions = searchPlaceResults.map(({ place_name, x, y }) => ({
          title: place_name,
          latlng: new kakao.maps.LatLng(y, x),
        }));

        positions.forEach((p, idx) => {
          makeMarker(p.latlng, p.title, markerImage, idx);
        });

        panTo(+x, +y);
      }
      makeMarker(position.latlng, position.title, markerImage);

      function makeMarker(position: string, title: string, image: any, index?: number) {
        const marker = new kakao.maps.Marker({
          map,
          position,
          title,
          image,
        });
        if (index) {
          kakao.maps.event.addListener(marker, 'click', () => {
            changeCurrentPlace(index);
          });
        }
      }

      function panTo(x: number, y: number) {
        const moveLatLon = new kakao.maps.LatLng(y, x);
        map.panTo(moveLatLon);
      }
    });
  }, [searchPlaceResults, currentPlace]);

  return <div id='kakaoMap' style={{ width: '100%', height: '30rem', marginBottom: '1rem', borderRadius: '0.5rem' }} />;
};

export default Map;

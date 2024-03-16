# 🚩 Topic

- 맛있게 먹었던 음식들을 장소와 함께 일기로 남기는 장소 기반 일기 서비스
- 또는 장소를 검색하여 폴더에 저장함으로써 맛집 버킷 리스트 등으로 활용 가능

# 🪧 Summary

기획자 또는 디자이너와 함께 프로젝트를 만들어가는 서비스 SWYG 3기로써 참여하여 기획자분과 협업하여 만든 서비스 입니다. <br />
SWYG 홈페이지에 정식으로 배포되어 누구든지 이용할 수 있습니다.
([링크](https://www.swygbro.com/contents/cee05571-d916-42de-811a-2e2e9e09965f))

가고 싶은 곳을 지도에 저장할 수 있습니다. 또한 일기를 쓰듯이 방문한 장소와 음식에 대한 기록을 남길 수 있습니다.  <br />
기록을 공개해 정보를 공유하는 사이트로도 활용할 수 있습니다.

# 🛣️ How to Execute 

- DB 정보를 포함한 .env 파일이 없어 정상 작동이 어렵습니다.
- 정상 작동되는 서비스는 링크를 통해 확인 해주세요. ([링크](https://food-diary-eta.vercel.app/))

```
// 프로젝트 복제
git clone https://github.com/seongjin2427/food-diary.git

// 프로젝트 폴더로 이동
cd food-diary

// 패키지 설치
npm install

// 서버 실행
npm run dev
```

# 🔑 Key Function

- 회원가입/로그인
    - Kakao Oauth를 이용, localStorage에 로그인 Token 정보를 저장하고 Refresh Token을 쿠키에 보관하여 서버측과 통신마다 로그인 유지 기능을 구현했습니다.
- 캘린더 기능
    - CSS Grid와 로직을 직접 구현하여 메인 화면의 캘린더를 만들었습니다.
- 일기 작성
    - 일기 내용에 대한 상태 관리는 Redux-toolkit을 이용하여 관리, tiptap 라이브러리를 사용하여 위지윅 텍스트 에디터를 구현, 업로드된 이미지를 AWS S3에 별도로 저장하고 그 경로를 DB에 저장하여 관리했습니다.
- 일기 검색
    - AWS EC2 서버에 구축된 MySQL DB로부터 Sequelize를 통해 검색된 단어 및 지정한 날짜에 따른 일기를 검색할 수 있도록 했습니다.
- 장소 검색
    - Kakao Map API를 사용하여 검색단어와 유관한 장소를 검색하고 그 위치를 확인 할 수 있도록 구현했습니다.

# ⚒️ Tech Stack

`TypeScript`, `Next.js`, `Redux-toolkit`, `Emotion`, `MySQL`, `Sequelize`, 

`AWS S3`, `AWS EC2`

# 🧑🏻‍💻 Team

- 기획자 1명
- 웹 개발자 1명

# 🧱 Part

- 개발 총괄
- 프론트엔드 및 백엔드 개발 진행

# 😊 Learned

- 기획자가 요청한 요구사항에 대해 구현해보고 서로 협의하며 맞춰가는 경험을 할 수 있었음
- Kakao Map API를 이용한 위치 정보 관련 서비스를 구현해볼 수 있었음
- Next.js의 API 기능만을 활용하여 별도의 백엔드 서버가 없는 풀스택 개발 경험을 해볼 수 있었음

# ScreenShot

<div>
  <img width="235px" height="500px" src="https://user-images.githubusercontent.com/59536977/201129228-4d8de375-8f37-45cf-bf9e-2ca0d9ae0899.png" />
  <img width="235px" height="500px" src="https://user-images.githubusercontent.com/59536977/201129437-4d0710a4-c42e-4832-b5bd-cd821a505231.png" />
  <img width="235px" height="500px" src="https://user-images.githubusercontent.com/59536977/201129519-9e52f117-d6ad-43d0-a73b-3b26b9ba1adc.png" />
</div>

<div>
  <img width="235px" height="500px" src="https://user-images.githubusercontent.com/59536977/201129595-6222ee0f-bca5-47ce-9153-15a2b6bcc2a8.png" />
  <img width="235px" height="500px" src="https://user-images.githubusercontent.com/59536977/201129654-12b99e6f-79ca-4c5b-bad6-47a47a4aa1d1.png" />
  <img width="235px" height="500px" src="https://user-images.githubusercontent.com/59536977/201129884-a42f3fa7-f59e-4240-8951-51a0831b94d8.png" />
</div>

<div>
  <img width="235px" height="500px" src="https://user-images.githubusercontent.com/59536977/201130153-9664610c-ae57-4a98-93de-e633b772cf01.png" />
  <img width="235px" height="500px" src="https://user-images.githubusercontent.com/59536977/201130231-63520ac9-b669-4656-85de-8fd1d07d9240.png" />
  <img width="235px" height="500px" src="https://user-images.githubusercontent.com/59536977/201130287-3e09ed83-e83c-4d75-b4fe-fa6258d48a64.png" />
</div>



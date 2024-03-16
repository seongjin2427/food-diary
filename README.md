# 음식일기 

<div style="display: flex;">

<img width="40%" alt="image" src="https://github.com/seongjin2427/food-diary/assets/59536977/9fc9e460-9b4e-4586-b3a4-63ddfa5cbf43">

<img width="40%" alt="image" src="https://github.com/seongjin2427/food-diary/assets/59536977/b274d2f3-479a-4b3a-9191-c871b9b8f0b2">

</div>

<br />

# 프로젝트 구조

![image](https://github.com/seongjin2427/food-diary/assets/59536977/fc59ace5-0014-4996-856c-c7b494960662)

<br />

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

# ⚒️ Tech Stack

`TypeScript`, `Next.js`, `Redux-toolkit`, `Emotion`

`MySQL`, `Sequelize`

`AWS S3`, `AWS EC2`

# 🧑🏻‍💻 Team

- 기획자 1명
- 개발자 1명 (프론트엔드/백엔드)

# 😊 Learned

- 기획자가 요청한 요구사항에 대해 구현해보고 서로 협의하며 맞춰가는 경험을 할 수 있었음
- Kakao Map API를 이용한 위치 정보 관련 서비스를 구현해볼 수 있었음
- Next.js의 API 기능만을 활용하여 별도의 백엔드 서버가 없는 풀스택 개발 경험을 해볼 수 있었음

# 🔑 Key Function

## Kakao Oauth 프로세스

![image](https://github.com/seongjin2427/food-diary/assets/59536977/52f59d84-9492-4d94-bf75-96df2fc6f3b7)


1. Kakao 로그인 버튼을 클릭하면,
    - 사용자를 Kakao 로그인 URL(`https://kauth.kakao.com/oauth`)로 Redirect 합니다.
    - `Authorization Code`를 포함한 응답을 받을 Redirect URL(`/api/auth/login`)을 쿼리 스트링에 포함시킵니다.
    (사전에 Google Flatform에서 발급받은 Google Client ID, 최종적으로 응답받을 사용자 정보 범위도 함께 쿼리스트링에 포함시킵니다.)
2. 음식일기 Next 서버로 `Authorization Code`를 포함한 응답을 받습니다.
3. 응답 받은 `Authorization Code`를 포함하여 `Token`을 요청합니다.
4. 음식일기 Next 서버에서 `Access Token`과 `Refresh Token`을 응답 받습니다.
5. 발급 받은 `Access Token`을 포함하여 필요한 사용자 정보를 요청합니다.
    - 요청하는 사용자 정보
        - `account_email`, `nickname`, `profile image`, `birthday`, `gender`
6. 요청한 사용자 정보를 응답받습니다.
7. 응답 받은 사용자 정보를 기반으로, `Sequelize` 를 통해 `AWS EC2`의 `MySQL`로 해당 사용자의 정보를 생성합니다.
    - Kakao로부터 응답받은 `Access Token`, `Refresh Token`을 그대로 DB에 업데이트 합니다.
8. Next 클라이언트로 `Refresh Token`을 쿠키에 담아 보냅니다.
9. 발급 받은 `Refresh Token`가 쿠키에 포함되어 Next 서버로 `Access Token`을 요청합니다.
10. `Refresh Token`을 확인하여, 해당 `Refresh Token을` 가진 사용자 정보를 조회합니다.
    - `Access Token`과 조회된 사용자 정보를 응답으로 반환합니다.
11. 반환 받은 `Access Token`을 Local Storage에 저장합니다.
    - 전역 상태의 사용자 정보에 응답 받은 사용자 정보를 업데이트 합니다.
    - 전역 상태인 로그인 상태를 `true`로 업데이트 합니다.

</br>

## 메인페이지 캘린더 구현

**문제점**

- 요구사항에 맞는 구현을 위한 라이브러리를 찾을 수 없어 직접 구현하기로 했습니다.
- 사용자는 메인 페이지의 캘린더를 통해 일기를 작성하거나, 이미 작성했던 일기를 읽어볼 수 있습니다.
- 요구사항
    1. 년월의 양 옆 화살표를 클릭하여 이전 달, 다음 달로 이동할 수 있어야 한다.
    2. 시작일에 맞추어 빈 여백을 둔다.
    3. 썸네일이 존재하지 않는 날짜를 클릭하면 일기 작성 페이지로 이동한다. (한 날짜당 하나의 일기)
    4. 썸네일이 존재하는 날짜를 클릭하면 기존에 작성했던 일기 읽기 페이지로 이동한다.

**커스텀 훅을 통한 캘린더 계산 로직 분리**

- 커스텀 훅을 통해 관심사 분리를 하여 결합도는 낮추고 응집도는 높이는 코드를 얻을 수 있었습니다.

**구현**

- `useCalendar` 훅을 통해 계산된 데이터를 반환 받습니다.
    1. 일별로 작성된 일기 데이터와 결합된 캘린더 데이터
    2. 현재 월을 기준으로 일주일 중 시작하는 요일이 몇 번째 인지를 반환
- 1번 데이터를 기반으로, **썸네일 이미지 주소가 포함된 날짜에는 썸네일 이미지를 렌더링합니다.**
- 2번 데이터를 전달하여 **Grid 레이아웃의 컬럼 시작 번호를 지정, 빈 여백을 구현했습니다.**
(아래 사진 중 일~목은 **빈 여백**, 금요일부터 1일이 시작됩니다.)

![image](https://github.com/seongjin2427/food-diary/assets/59536977/118fbadf-6137-44a8-af30-4f2bf3c0c6a4)

</br>

## [tiptap](https://tiptap.dev/) 라이브러리를 활용한 WYSIWYG 에디터 구현

### 직관적인 커스텀을 위한 Headless 라이브러리 채택

**문제점**

- 많이 사용하는 `Toast Editor`의 경우, 에디터를 초기화 하는 영역에 의존적이기 때문에
커스텀한 요소를 찾아내기 위해서는 항상 해당 영역을 살펴봐야 합니다.

```tsx
...
toolbarItems={[
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
    // 툴바명, 요소, 스타일 모두 에디터 초기화 영역에 의존적입니다.
    [{
        name: 'Youtube',
        tooltip: 'Youtube',
        el: myCustomEl,
        popup: {
            body: container,
            style: { width: 'auto' },
          }
    }]
]}
...
```

**Headless 에디터 라이브러리 `tiptap` 사용**

- `tiptap`은 Headless WYSIWYG 에디터로, **필요한 로직만을 기존 컴포넌트에 부여**할 수 있습니다.
- 초기화 된 `editor`인스턴스를 주입 받으면 해당 로직을 사용할 수 있습니다.

![image](https://github.com/seongjin2427/food-diary/assets/59536977/28f56035-0087-4fde-97be-f61ee05ac58b)


### 커스텀 에디터 컴포넌트 구현 (`CustomImage`)

**문제점**

- WYSIWYG 에디터는 사용자가 편집할 때마다 실시간으로 반영되도록 구현해야 합니다.
- 요구사항 중 하나로, 이미지 체크박스가 있고 체크가 되어있는 이미지는 일기의 썸네일로 적용됩니다.
- **에디터 내 이미지를 삽입하는 기능은 캡슐화 되어 있어 체크박스를 추가하는 것이 불가능합니다.**

**WYSIWYG 에디터에서 사용할 수 있는 커스텀 컴포넌트 구현**

- 대신 라이브러리에서 제공하는 `NodeViewWrapper`, `Node.create`를 통해 **요구사항에 맞는 컴포넌트를 직접 구현**하였습니다.

![image](https://github.com/seongjin2427/food-diary/assets/59536977/b7d16603-0979-4d5a-bc57-0b62ee1d4403)


```tsx
const CustomImage = (props: any) => {
  const dispatch = useAppDispatch();
  const {
	  // 일기 편집 상태 여부
    global: { diaryModifyMode },
    // 현재 작성중인 일기의 썸네일(이미지) 아이디
    diary: { thumbnail },
  } = useAppSelector((state) => state);

  const onChangeThumbnail = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDiaryByName({ name: 'thumbnail', value }));
  };

	// 썸네일이 없다면 props로 전달받는 id를 즉시 할당
  useEffect(() => {
    if (!thumbnail) {
      dispatch(setDiaryByName({ name: 'thumbnail', value: props.node.attrs.id }));
    }
  }, []);

  return (
    <NodeViewWrapper>
      <S.Container>
        {diaryModifyMode && (
          <S.CheckBox
            {/* "type=radio"와 동일한 name을 부여하여 하나의 값만 선택 가능 */}
            type='radio'
            name='image'
            value={props.node.attrs.id}
            onChange={onChangeThumbnail}
            defaultChecked={thumbnail === '' || +thumbnail === +props.node.attrs.id}
          />
        )}

        <S.Image src={props.node.attrs.src} />
      </S.Container>
    </NodeViewWrapper>
  );
};

export default Node.create({
  name: 'customImage',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: '',
      id: '',
    };
  },
  parseHTML() {
    return [{ tag: 'custom-image' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['custom-image', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(CustomImage);
  },
});
```

</br>

## 이미지 업로드 필터링

**문제점**

- 이미지가 아닌 파일을 업로드 하면, 업로드 후의 이미지를 삽입하는 로직에서 문제가 발생합니다.
- 또한, 용량의 제한이 없다면, 악의적인 업로드에 스토리지에 부담을 주게 됩니다.

**특정 상황을 필터링 하기 위한 예외 처리 및 사용자 피드백**

- 이를 막고자 **이미지 업로드 시, 용량 제한 및 특정 타입의 파일만 업로드할 수 있도록 필터링 했습니다.**

![image](https://github.com/seongjin2427/food-diary/assets/59536977/9cae2c9e-42fc-4ddd-aeef-cc2d912db703)


```tsx
try {
  if (!PERMITTED_IMAGE_TYPES.includes(targetImage.type)) {
    throw new Error(
      '형식에 맞지 않는 이미지입니다. 다시 시도해주세요.\n(jpg, jpeg, png, gif, avif, webp만 가능)',
    );
  }

  if (LIMIT_SIZE < targetImage.size) {
    throw new Error('5MB 이하의 이미지만 업로드가 가능합니다.\n다시 시도해주세요.');
  }

  const imageFile = await uploadImageFile(targetImage);
  imageInputRef.current!.value = '';

  if (imageFile) {
    const { img_id, src } = imageFile;
    editor
      ?.chain()
      .focus()
      .insertContent(`<custom-image id=${img_id} src=${src} />`)
      .createParagraphNear()
      .run();

    dispatch(addImage({ img_id, src }));
  }
} catch (e) {
  const error = e as Error;
  alert(error.message);
}
```

</br>

## 폴더 기반/지도 API 기반 검색 구현

### 폴더 기반 지도 검색 페이지 (슬라이드/리스트)

- 사용자는 일기를 작성할 때, 장소를 검색하여 일기에 등록하고, 원하는 폴더에 저장하게 됩니다.
- 이렇게 저장한 장소들을 폴더 별로 필터링해서 보거나, 검색하여 해당 위치를 확인할 수 있습니다.
- 필요하다면 리스트 형식으로 변경하여 리스트 위주로 살펴볼 수 있습니다.

![image](https://github.com/seongjin2427/food-diary/assets/59536977/036193b2-eead-4e2f-8db8-a07e4bd75795)


**문제점**

- 슬라이드/리스트를 전환할 수 있는 리스트를 컴포넌트를 하나로 구현할 수 있을지 고민이 많았습니다.

**리스트 형태에 따라 컴포넌트를 분리하기로 결정**

- 목록을 나열해야 한다는 관심사는 동일하나, 하나의 컴포넌트에서 두 가지 다른 형태의 기능을 구현하기에는 **복잡도가 매우 증가할 것이라고 생각했습니다.**
- 완전히 분리한 뒤, 상태에 따라 다른 컴포넌트를 렌더링하도록 했습니다.

![image](https://github.com/seongjin2427/food-diary/assets/59536977/e1d2faa7-9e17-4b40-9015-973fd1102b52)

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



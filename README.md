# ssson house Picks — 수정 방법

## 가장 쉬운 수정 방법

상품 정보와 하단 링크는 `products.js`에서만 수정하면 됩니다.

### 새 상품 추가
`products.js`의 `products` 배열 안에서 상품 한 덩어리를 복사한 뒤 아래 값만 바꾸세요.

```js
{
  id: 4,
  name: "상품명",
  category: "가구",
  image: "assets/사진파일명.jpg",
  house: "오늘의집 링크",
  coupang: "쿠팡 링크",
  created: "2026-07-24"
}
```

쿠팡 링크가 없으면 아래처럼 비워두세요.

```js
coupang: ""
```

### 사진 추가
1. 사진을 `assets` 폴더에 넣습니다.
2. `image`에 파일 경로를 입력합니다.

예:
```js
image: "assets/my-chair.jpg"
```

### 맨 아래 링크 수정
`products.js` 맨 위의 `SITE_LINKS`만 바꾸면 됩니다.

```js
const SITE_LINKS = {
  todayHouse: "오늘의집 프로필 링크",
  youtube: "유튜브 링크"
};
```

## GitHub에 올리는 방법
저장소에서 기존 파일을 새 파일로 교체하고 Commit changes를 누르세요.
필요 파일:
- index.html
- style.css
- script.js
- products.js
- assets 폴더

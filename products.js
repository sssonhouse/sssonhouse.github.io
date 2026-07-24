/*
=========================================================
여기만 수정하면 됩니다!
=========================================================

상품 추가 방법:
1. 아래 products 안에서 기존 상품 한 덩어리를 복사
2. id는 겹치지 않게 변경
3. name / category / image / house / coupang / created 수정
4. 쿠팡 링크가 없으면 coupang: "" 로 입력

이미지는 assets 폴더에 넣고:
image: "assets/파일명.jpg"

사용 가능한 category:
"가구", "조명", "패브릭", "주방", "기타"
*/

const SITE_LINKS = {
  todayHouse: "https://ozip.me/gZgqinH?af",
  youtube: "https://youtube.com/channel/UCSjDeWjC0U8WVfIGSb83uRA?si=spABVVaAYRv4oxTM"
};

const products = [
  {
    id: 3,
    name: "레탄토 책상",
    category: "가구",
    image: "assets/retanto-desk.jpg",
    house: "https://ozip.me/G8PB3by?af",
    coupang: "https://link.coupang.com/a/fDTizi2wwK",
    created: "2026-07-24"
  },
  {
    id: 2,
    name: "앵커 거울",
    category: "가구",
    image: "assets/anchor-mirror.jpg",
    house: "https://ozip.me/EI853kM?af",
    coupang: "",
    created: "2026-07-23"
  },
  {
    id: 1,
    name: "비트윈 서랍장",
    category: "가구",
    image: "assets/between-drawer.jpg",
    house: "https://ozip.me/i4OHzOr?af",
    coupang: "https://link.coupang.com/a/fDFUh5XQjc",
    created: "2026-07-22"
  }
];

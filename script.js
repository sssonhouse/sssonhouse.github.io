const products = [
  {
    id: 1,
    category: "가구",
    brand: "가온퍼니쳐",
    name: "비트윈 서랍장",
    note: "고무나무로 제작되어 따뜻한 분위기가 나고, 부드럽게 열리는 레일이 특징이에요.",
    image: "./assets/between-drawer.jpeg",
    todayhouse: "https://ozip.me/i4OHzOr?af",
    coupang: "https://link.coupang.com/a/fDFUh5XQjc",
    createdAt: "2026-07-24"
  },
  {
    id: 2,
    category: "가구",
    brand: "바미르",
    name: "앵커 거울",
    note: "바닥에 세워두기만 해도 예쁜 포인트가 되는 행잉 거울이에요.",
    image: "./assets/anchor-mirror.jpeg",
    todayhouse: "https://ozip.me/EI853kM?af",
    coupang: "",
    createdAt: "2026-07-24"
  }
];

const categories = ["전체", "가구", "조명", "수납", "의자", "소파", "패브릭", "주방", "욕실", "뷰티", "고양이"];

const grid = document.querySelector("#productGrid");
const categoryTabs = document.querySelector("#categoryTabs");
const template = document.querySelector("#productTemplate");
const emptyState = document.querySelector("#emptyState");
const sortButtons = [...document.querySelectorAll(".sort-btn")];

let activeCategory = "전체";
let activeSort = "newest";

function getCategoryCount(category) {
  return category === "전체"
    ? products.length
    : products.filter(product => product.category === category).length;
}

function drawCategories() {
  categoryTabs.innerHTML = "";
  categories.forEach(category => {
    const count = getCategoryCount(category);
    if (category !== "전체" && count === 0) return;

    const button = document.createElement("button");
    button.className = `category-btn${category === activeCategory ? " active" : ""}`;
    button.dataset.category = category;
    button.innerHTML = `${category}<span class="count">${count}</span>`;

    button.addEventListener("click", () => {
      activeCategory = category;
      drawCategories();
      renderProducts();
    });

    categoryTabs.appendChild(button);
  });
}

function getVisibleProducts() {
  let items = activeCategory === "전체"
    ? [...products]
    : products.filter(product => product.category === activeCategory);

  if (activeSort === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name, "ko"));
  } else {
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) || b.id - a.id);
  }
  return items;
}

function renderProducts() {
  const items = getVisibleProducts();
  grid.innerHTML = "";
  emptyState.hidden = items.length !== 0;

  items.forEach(product => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".brand").textContent = product.brand;
    fragment.querySelector(".name").textContent = product.name;
    fragment.querySelector(".note").textContent = product.note;

    const image = fragment.querySelector(".product-image");
    image.src = product.image;
    image.alt = `${product.brand} ${product.name}`;

    const todayhouse = fragment.querySelector(".todayhouse");
    const coupang = fragment.querySelector(".coupang");

    if (product.todayhouse) {
      todayhouse.href = product.todayhouse;
    } else {
      todayhouse.hidden = true;
    }

    if (product.coupang) {
      coupang.href = product.coupang;
    } else {
      coupang.hidden = true;
    }

    const linkRow = fragment.querySelector(".shop-links");
    const visibleLinks = [todayhouse, coupang].filter(link => !link.hidden);
    if (visibleLinks.length === 1) {
      linkRow.style.gridTemplateColumns = "1fr";
    }

    grid.appendChild(fragment);
  });
}

sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeSort = button.dataset.sort;
    sortButtons.forEach(item => item.classList.toggle("active", item === button));
    renderProducts();
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
drawCategories();
renderProducts();

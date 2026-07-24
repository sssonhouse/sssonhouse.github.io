const products = [
  {
    id: 2,
    name: "앵커 거울",
    brand: "바미르",
    category: "가구",
    description: "바닥에 세워두기만 해도 예쁜 행잉 거울",
    image: "assets/anchor-mirror.jpeg",
    todayhouse: "https://ozip.me/EI853kM?af",
    coupang: ""
  },
  {
    id: 1,
    name: "비트윈 서랍장",
    brand: "가온퍼니쳐",
    category: "가구",
    description: "고무나무의 따뜻한 분위기와 부드러운 레일이 매력적인 서랍장",
    image: "assets/between-drawer.jpeg",
    todayhouse: "https://ozip.me/i4OHzOr?af",
    coupang: "https://link.coupang.com/a/fDFUh5XQjc"
  }
];

const categories = ["전체", "가구", "조명", "패브릭", "주방", "욕실", "뷰티", "고양이"];

let currentCategory = "전체";
let currentSort = "latest";

const categoryScroll = document.getElementById("categoryScroll");
const productGrid = document.getElementById("productGrid");
const productTemplate = document.getElementById("productTemplate");
const visibleCount = document.getElementById("visibleCount");
const emptyState = document.getElementById("emptyState");

function getCategoryCount(category) {
  if (category === "전체") return products.length;
  return products.filter(product => product.category === category).length;
}

function renderCategories() {
  categoryScroll.innerHTML = "";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-button${category === currentCategory ? " active" : ""}`;
    button.innerHTML = `${category}<span>${getCategoryCount(category)}</span>`;

    button.addEventListener("click", () => {
      currentCategory = category;
      renderCategories();
      renderProducts();
    });

    categoryScroll.appendChild(button);
  });
}

function getVisibleProducts() {
  const filtered = currentCategory === "전체"
    ? [...products]
    : products.filter(product => product.category === currentCategory);

  return filtered.sort((a, b) => {
    if (currentSort === "name") {
      return a.name.localeCompare(b.name, "ko");
    }
    return b.id - a.id;
  });
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();
  visibleCount.textContent = visibleProducts.length;
  productGrid.innerHTML = "";
  emptyState.hidden = visibleProducts.length !== 0;

  visibleProducts.forEach(product => {
    const card = productTemplate.content.cloneNode(true);

    const brand = card.querySelector(".brand-pill");
    const category = card.querySelector(".category-label");
    const image = card.querySelector(".product-image");
    const imageLink = card.querySelector(".image-link");
    const name = card.querySelector(".product-name");
    const description = card.querySelector(".product-description");
    const todayhouse = card.querySelector(".todayhouse");
    const coupang = card.querySelector(".coupang");

    brand.textContent = product.brand;
    category.textContent = product.category;
    image.src = product.image;
    image.alt = `${product.brand} ${product.name}`;
    name.textContent = product.name;
    description.textContent = product.description;

    const primaryLink = product.todayhouse || product.coupang || "#";
    imageLink.href = primaryLink;

    if (product.todayhouse) {
      todayhouse.href = product.todayhouse;
    } else {
      todayhouse.remove();
    }

    if (product.coupang) {
      coupang.href = product.coupang;
    } else {
      coupang.remove();
    }

    productGrid.appendChild(card);
  });
}

document.querySelectorAll(".sort-button").forEach(button => {
  button.addEventListener("click", () => {
    currentSort = button.dataset.sort;

    document.querySelectorAll(".sort-button").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderProducts();
  });
});

renderCategories();
renderProducts();

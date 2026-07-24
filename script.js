let selectedCategory = "전체";
let selectedSort = "new";

const categoryDefs = [
  {name:"전체", icon:'<svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>'},
  {name:"가구", icon:'<svg viewBox="0 0 24 24"><path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M4 11h16v7H4zM7 18v2M17 18v2"/></svg>'},
  {name:"조명", icon:'<svg viewBox="0 0 24 24"><path d="M9 4h6l1 8H8zM12 12v5M8 20h8M10 17h4"/></svg>'},
  {name:"패브릭", icon:'<svg viewBox="0 0 24 24"><path d="M12 20V9M12 12c-4 0-6-2-6-5 4 0 6 2 6 5ZM12 15c4 0 6-2 6-5-4 0-6 2-6 5Z"/></svg>'},
  {name:"주방", icon:'<svg viewBox="0 0 24 24"><path d="M6 8h12l1 11H5zM9 8V6a3 3 0 0 1 6 0v2"/></svg>'},
  {name:"기타", icon:'<svg viewBox="0 0 24 24"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>'}
];

const categoriesEl = document.getElementById("categories");
const gridEl = document.getElementById("productGrid");
const countEl = document.getElementById("itemCount");

function countCategory(name){
  return name === "전체" ? products.length : products.filter(p => p.category === name).length;
}

function renderCategories(){
  categoriesEl.innerHTML = "";
  categoryDefs.forEach(def => {
    const btn = document.createElement("button");
    btn.className = "category" + (selectedCategory === def.name ? " active" : "");
    btn.innerHTML = `${def.icon}<span>${def.name}</span><span class="num">${countCategory(def.name)}</span>`;
    btn.addEventListener("click", () => {
      selectedCategory = def.name;
      renderCategories();
      renderProducts();
    });
    categoriesEl.appendChild(btn);
  });
}

function houseIcon(){
  return '<svg viewBox="0 0 24 24"><path d="M4.5 10.8 12 4l7.5 6.8v8.1a1.1 1.1 0 0 1-1.1 1.1h-4.2v-5.6H9.8V20H5.6a1.1 1.1 0 0 1-1.1-1.1z"/></svg>';
}

function shopButton(type, url){
  if(!url) return '<span class="shop placeholder" aria-hidden="true"></span>';
  if(type === "house"){
    return `<a class="shop house" href="${url}" target="_blank" rel="noopener sponsored">${houseIcon()}<span>오늘의집</span></a>`;
  }
  return `<a class="shop coupang" href="${url}" target="_blank" rel="noopener sponsored">
    <img alt="쿠팡" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 132 34'%3E%3Ctext x='1' y='25' font-family='Arial,sans-serif' font-size='25' font-weight='700' fill='%23b04e2d'%3Ec%3C/text%3E%3Ctext x='17' y='25' font-family='Arial,sans-serif' font-size='25' font-weight='700' fill='%23e15c2c'%3Eo%3C/text%3E%3Ctext x='34' y='25' font-family='Arial,sans-serif' font-size='25' font-weight='700' fill='%23f09c1d'%3Eu%3C/text%3E%3Ctext x='51' y='25' font-family='Arial,sans-serif' font-size='25' font-weight='700' fill='%234db7be'%3Ep%3C/text%3E%3Ctext x='68' y='25' font-family='Arial,sans-serif' font-size='25' font-weight='700' fill='%233f91d1'%3Ea%3C/text%3E%3Ctext x='84' y='25' font-family='Arial,sans-serif' font-size='25' font-weight='700' fill='%237a73b7'%3En%3C/text%3E%3Ctext x='102' y='25' font-family='Arial,sans-serif' font-size='25' font-weight='700' fill='%23b04e2d'%3Eg%3C/text%3E%3C/svg%3E">
  </a>`;
}

function visibleProducts(){
  let list = selectedCategory === "전체"
    ? [...products]
    : products.filter(p => p.category === selectedCategory);

  if(selectedSort === "name"){
    list.sort((a,b) => a.name.localeCompare(b.name, "ko"));
  } else {
    list.sort((a,b) => new Date(b.created) - new Date(a.created));
  }
  return list;
}

function renderProducts(){
  const list = visibleProducts();
  countEl.textContent = list.length;
  if(!list.length){
    gridEl.innerHTML = '<p class="empty">아직 등록된 상품이 없어요.</p>';
    return;
  }
  gridEl.innerHTML = list.map(p => `
    <article class="card">
      <div class="photo-wrap">
        <img class="photo" src="${p.image}" alt="${p.name}">
        <button class="heart" type="button" aria-label="${p.name} 찜하기">♡</button>
      </div>
      <div class="info">
        <h2 class="name">${p.name}</h2>
        <div class="shop-row">
          ${shopButton("house", p.house)}
          ${shopButton("coupang", p.coupang)}
        </div>
      </div>
    </article>
  `).join("");
}

document.querySelectorAll(".sort button").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedSort = btn.dataset.sort;
    document.querySelectorAll(".sort button").forEach(b => b.classList.toggle("active", b === btn));
    renderProducts();
  });
});

document.getElementById("allHouseLink").href = SITE_LINKS.todayHouse;
document.getElementById("youtubeLink").href = SITE_LINKS.youtube;

renderCategories();
renderProducts();

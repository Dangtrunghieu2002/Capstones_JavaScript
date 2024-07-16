const wrapper = document.querySelector('.sliderWrapper');

const menuItems = document.querySelectorAll('.menuItem');

const products = [];

let chosenProduct = {};

const currentProductImg = document.querySelector('.productImage');
const currentProductTitle = document.querySelector('.productTitle');
const currentProductPrice = document.querySelector('.productPrice');
const currentProductColors = document.querySelectorAll('.color');
const currentProductSizes = document.querySelectorAll('.size');

// Fetch products from API
fetch('https://shop.cyberlearn.vn/api/Product')
  .then(response => response.json())
  .then(data => {
    products = data.content;
    chosenProduct = products[0];
    updateProductDetails();
  })
  .catch(error => console.error('Error fetching products:', error));


// Fetch products list based on categories
function layDanhSachGiayTheoDanhSach() {
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product/getProductByCategory",
    method: "GET",
  });
  promise
    .then((res) => {
      renderDuLieuGiay(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}

// chạy function để ra kết quả
layDanhSachGiayTheoDanhSach();

// thực hiện render dữ liệu lên giao diện
function renderDuLieuGiay(arrGiay, idTheCha = "baiTap2") {
  let content = "";
  for (let giay of arrGiay) {
    let { image, name, price, shortDescription, id } = giay;
    content += `
       <div class="col-3">
          <!-- hình  -->
          <img src=${image} class="w-100" alt="" />
          <!-- tên  -->
          <h4>${name}</h4>
          <!-- giá  -->
          <p>${price}</p>
          <!-- icon  -->
          <i></i>
          <button>
            <i></i>
          </button>
        </div>
      `;
  }
  document.getElementById(idTheCha).innerHTML = content;
}
renderDuLieuGiay(giay);

menuItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    //changes the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //changes the chosen product
    chosenProduct = products[index];
    updateProductDetails();
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener('click', () => {
    currentProductImg.src = chosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener('click', () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = 'white';
      size.style.color = 'black';
    });
    size.style.backgroundColor = 'black';
    size.style.color = 'white';
  });
});

const productButton = document.querySelector('.productButton');
const payment = document.querySelector('.payment');
const close = document.querySelector('.close');

productButton.addEventListener('click', () => {
  payment.style.display = 'flex';
});
close.addEventListener('click', () => {
  payment.style.display = 'none';
});


function updateProductDetails() {
  currentProductTitle.textContent = chosenProduct.name.toUpperCase();
  currentProductPrice.textContent = '$' + chosenProduct.price;
  currentProductImg.src = chosenProduct.images[0];

  // Update the product colors
  currentProductColors.forEach((color, index) => {
    color.style.backgroundColor = chosenProduct.colors[index].code;
  });
}

// New
function layDanhSachGiay() {
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  });
  promise
    .then((res) => {
      renderDuLieuGiay(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}
// chạy function để ra kết quả
layDanhSachGiay();

// thực hiện render dữ liệu lên giao diện
function renderDuLieuGiay(arrGiay, idTheCha = "baiTap2") {
  let content = "";
  for (let giay of arrGiay) {
    let { image, name, price, shortDescription, id } = giay;
    content += `
       <div class="col-3">
          <!-- hình  -->
          <img src=${image} class="w-100" alt="" />
          <!-- tên  -->
          <h4>${name}</h4>
          <!-- giá  -->
          <p>${price}</p>
          <!-- icon  -->
          <i></i>
          <button>
            <i></i>
          </button>
        </div>
      `;
  }
  document.getElementById(idTheCha).innerHTML = content;
}
renderDuLieuGiay(giay);

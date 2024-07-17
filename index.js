document.addEventListener('DOMContentLoaded', () => {
    // Select necessary DOM elements
    const wrapper = document.querySelector('.sliderWrapper');
    const menuItems = document.querySelectorAll('.menuItem');
    const productsContainer = document.getElementById('productsContainer');
    const productDetailContainer = document.getElementById('productDetailContainer');
    const buyItems = document.querySelectorAll('.buyNowButton');




    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          //changes the current slide
          wrapper.style.transform = `translateX(${-100 * index}vw)`;
      
          //changes the chosen product
          chosenProduct = products[index];
      
          //changes the texts of current product
          currentProductTitle.textContent = chosenProduct.title.toUpperCase();
          currentProductPrice.textContent = '$' + chosenProduct.price;
          currentProductImg.src = chosenProduct.colors[0].img;
      
          //changes the style of product by selected color
          currentProductColors.forEach((color, index) => {
            color.style.backgroundColor = chosenProduct.colors[index].code;
          });
        });
    });

    
    // Add event listeners to menu items
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category'); // Get category ID from data attribute
            fetchProductsByCategory(category); // Fetch products for the selected category
        });
    });

    // Function to fetch products by category
    function fetchProductsByCategory(category) {
        fetch(`https://shop.cyberlearn.vn/api/Product/?keyword=${category}`)
            .then(response => response.json())
            .then(data => {
                renderProducts(data.content); // Render the fetched products
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Function to render products
    function renderProducts(products) {
        productsContainer.innerHTML = ''; // Clear previous products
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('productItem');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="productContent">
                    <div class="productItemTitle"><h3 data-category="${product.name}">${product.name}</h3></div>
                    <span>$${product.price}</span>
                    <button id="buyNowButton" class="buyNowButton">Buy now</button>
                </div>
            `;
            productItem.querySelector('.buyNowButton').addEventListener('click', () => {
                showProductDetail(product); // Show detailed view of the product
                productDetailContainer.scrollIntoView({ behavior: 'smooth' }); // Scroll to the detailed view
            });
            productsContainer.appendChild(productItem); // Add the product item to the container
        });
    }


    // Add event listeners to menu items
    buyItems.forEach(item => {
        item.addEventListener('click', () => {
            const productName = item.closest('productItem').querySelector('h3').getAttribute('data-category');// Get category name from data attribute
            fetchProductsByProductName(productName); // Fetch products for the selected category
        });
    });

    function fetchProductsByProductName(productName) {
        fetch(`https://shop.cyberlearn.vn/api/Product/?keyword=${productName}`)
            .then(response => response.json())
            .then(data => {
                renderProductsDetailed(data.content); // Render the fetched products
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    // Function to render detailed products
    function renderProductsDetailed(products) {
        productDetailContainer.innerHTML = ''; // Clear previous products
        products.forEach(product => {
            const productItemContent = document.createElement('div');
            productItemContent.classList.add('productContent');
            productItemContent.innerHTML = `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}" class="productImage">
                    <div class="productDetails">
                        <h1 class="productTitle">${product.name}</h1>
                        <h2 class="productPrice">$${product.price}</h2>
                        <p class="productDescription">${product.description}</p>
                        <div class="sizes">
                            ${product.size.map(size => `<div class="size">${size}</div>`).join('')}
                        </div>
                        <button class="productButton">BUY NOW</button>
                    </div>
                </div>
            `;
            productItemContent.querySelector('.productButton').addEventListener('click', () => {
                showProductDetail(product); // Show detailed view of the product
                productDetailContainer.scrollIntoView({ behavior: 'smooth' }); // Scroll to the detailed view
            });
            productDetailContainer.appendChild(productItemContent); // Add the product item to the container
        });
    }

    // Function to show product details (if needed)
    function showProductDetail(product) {
        productDetailContainer.style.display = 'block'; // Show product detail view
        productDetailContainer.innerHTML = `
            <div class="product" id="product">
                <img src="${product.image}" alt="${product.name}" class="productImage">
                <div class="productDetails">
                    <h1 class="productTitle">${product.name.toUpperCase()}</h1>
                    <h2 class="productPrice">$${product.price}</h2>
                    <p class="productDescription">${product.description}</p>
                    <div class="sizes">
                        ${JSON.parse(product.size).map(size => `<div class="size">${size}</div>`).join('')}
                    </div>
                    <button class="productButton">BUY NOW</button>
                </div>
            </div>
        `;

        // Add event listeners for size selection
        const sizeElements = productDetailContainer.querySelectorAll('.size');
        sizeElements.forEach(sizeElement => {
            sizeElement.addEventListener('click', () => {
                sizeElements.forEach(sizeEl => {
                    sizeEl.style.backgroundColor = 'white';
                    sizeEl.style.color = 'black';
                });
                sizeElement.style.backgroundColor = 'black';
                sizeElement.style.color = 'white';
            });
        });
    }
    

    // Initial load of products for the first category (example: Nike)
    fetchProductsByCategory('NIKE');
    fetchProductsByCategory('ADIDAS');
    fetchProductsByCategory('VANS_CONVERSE');
});

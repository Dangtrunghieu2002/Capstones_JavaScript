// script.js

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menuItem');
    const productsContainer = document.getElementById('productsContainer');
    const productDetailContainer = document.getElementById('productDetailContainer');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const categoryName = item.textContent.toUpperCase();
            const category = categories.find(cat => cat.category.toUpperCase() === categoryName);
            if (category) {
                fetchProductsByCategory(category.id);
            }
        });
    });

    function fetchProductsByCategory(categoryId) {
        fetch(`https://shop.cyberlearn.vn/api/Product`)
            .then(response => response.json())
            .then(data => {
                renderProducts(data.content);
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function renderProducts(products) {
        productsContainer.innerHTML = ''; // Clear previous products
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('productItem');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="productContent">
                    <div class="productItemTitle"><h3>${product.name}</h3></div>
                    <span>$${product.price}</span>
                    <button class="buyNowButton">Buy now</button>
                </div>
                
            `;
            productItem.querySelector('.buyNowButton').addEventListener('click', () => {
                showProductDetail(product);
                productDetailContainer.scrollIntoView({ behavior: 'smooth' });
            });
            productsContainer.appendChild(productItem);
        });
    }

    function showProductDetail(product) {
        productDetailContainer.style.display = 'block'; // Show product detail view

        productDetailContainer.innerHTML = `
            <div class="product" id="product">
                <img src="${product.image}" alt="${product.name}" class="productImage">
                <div class="productDetails">
                    <h1 class="productTitle">${product.name.toUpperCase()}</h1>
                    <h2 class="productPrice">$${product.price}</h2>
                    <p class="productDescription">${product.description}</p>
                    <div class="colors">
                        ${product.colors.map(color => `<div class="color" style="background-color: ${color};"></div>`).join('')}
                    </div>
                    <div class="sizes">
                        ${product.size.map(size => `<div class="size">${size}</div>`).join('')}
                    </div>
                    <button class="productButton">BUY NOW</button>
                </div>
            </div>
        `;

        // Add event listeners for color selection
        const colorElements = productDetailContainer.querySelectorAll('.color');
        colorElements.forEach((colorElement, index) => {
            colorElement.addEventListener('click', () => {
                productDetailContainer.querySelector('.productImage').src = product.colors[index].image;
            });
        });

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

    // Load initial category
    fetchProductsByCategory('NIKE');
});

'use strict';

import { getJackets } from "./api.js";
import { addToCart } from "./cart.js";
import { showLoading, showError } from "./ui.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const productImageContainer = document.querySelector('.product-image-container');

async function init () {
    const loading = showLoading(productImageContainer);

    try {
        const jackets = await getJackets();
        const selectedJacket = jackets.find((jacket) => {
            return String(jacket.id) === productId;
        });

        if (!selectedJacket) {
            showError(productImageContainer, 'Product not found.');
            return;
        }

        // Getting product image from API and display on page
        const productImage = document.createElement('img');
        productImage.setAttribute('src', selectedJacket.image.url);
        productImage.setAttribute('alt', selectedJacket.image.alt);
        productImage.classList.add('specific-product-image');
        productImageContainer.appendChild(productImage);

        // Getting product name, and displaying it on page
        const productOverviewHeader = document.getElementById('product-overview-header');
        const productTitle = document.createElement('h1');
        productTitle.textContent = selectedJacket.title;
        productOverviewHeader.appendChild(productTitle);

        document.title = 'RainyDays | ' + selectedJacket.title;

        // Checking if product is on sale, and displaying price accordingly
        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = '$' + selectedJacket.price.toFixed(2);
        productOverviewHeader.appendChild(productPrice);
        if (selectedJacket.onSale === true){
            productPrice.classList.add('old-price');
            const salePrice = document.createElement('p');
            salePrice.classList.add('product-price', 'on-sale');
            salePrice.textContent = '$' + selectedJacket.discountedPrice.toFixed(2);
            productOverviewHeader.appendChild(salePrice);
        }

        // Getting product sizes from API and displaying correct sizes on page
        const sizes = selectedJacket.sizes;

        let selectedSize = null;
        const cartMessage = document.getElementById('cart-message');

        sizes.forEach((size) => {
            const productSize = document.querySelector('.product-size');
            const sizeButton = document.createElement('button');
            sizeButton.classList.add('product-size__cta');
            sizeButton.setAttribute('type', 'button');
            sizeButton.textContent = size;

            productSize.appendChild(sizeButton);
            
            sizeButton.addEventListener('click', ()=>{
                selectedSize = size;
                cartMessage.textContent = '';
                const sizeButtonArray = document.querySelectorAll('.product-size__cta');
                sizeButtonArray.forEach((button) => {
                    button.classList.remove('selected');
                });
                sizeButton.classList.add('selected');
            });
        });

        // Adding products to the cart
        const cartButton = document.getElementById('cart-cta');

        cartButton.addEventListener('click', () => {
            cartMessage.textContent = '';
            if (!selectedSize) {
                cartMessage.textContent = 'Please choose a size first.';
                return;
            }
            addToCart(productId, selectedSize);
            cartMessage.textContent = 'Added to cart.';
        });

        // Getting product information and displaying it on page
        const productInformation = document.querySelector('.product-information');

        const productInformationTitle = document.createElement('h2');
        productInformationTitle.textContent = selectedJacket.title;
        productInformation.appendChild(productInformationTitle);

        const productDescription = document.createElement('p');
        productDescription.textContent = selectedJacket.description;
        productInformation.appendChild(productDescription);
    } catch (error) {
        showError(productImageContainer, 'Could not load product. Please try again later.');
    } finally {
        loading.remove();
    }
};

init();
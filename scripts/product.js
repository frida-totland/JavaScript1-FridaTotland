'use strict';

import { jackets } from "./api.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const selectedJacket = jackets.find((jacket) => {
  return String(jacket.id) === productId;
});

// Getting product image from API and display on page
const productImageContainer = document.querySelector('.product-image-container');
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
} else {
    productPrice
};

// Getting product sizes from API and displaying correct sizes on page
const sizes = selectedJacket.sizes;
sizes.forEach((size) => {
    const productSize = document.querySelector('.product-size');
    const sizeButton = document.createElement('p');
    sizeButton.classList.add('product-size__cta');
    sizeButton.textContent = size;

    productSize.appendChild(sizeButton);
});

// Getting product information and displaying it on page
const productInformation = document.querySelector('.product-information');

const productInformationTitle = document.createElement('h2');
productInformationTitle.textContent = selectedJacket.title;
productInformation.appendChild(productInformationTitle);

const productDescription = document.createElement('p');
productDescription.textContent = selectedJacket.description;
productInformation.appendChild(productDescription);
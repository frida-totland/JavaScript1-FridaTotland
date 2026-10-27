'use strict';

import { jackets } from "./api.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const selectedJacket = jackets.find((jacket) => {
  return String(jacket.id) === productId;
});

const productImageContainer = document.querySelector('.product-specific-page__images-big');
const productImage = document.createElement('img');
productImage.setAttribute('src', selectedJacket.image.url);
productImage.setAttribute('alt', selectedJacket.image.alt);
productImage.classList.add('product-specific-image-big');
productImageContainer.appendChild(productImage);


const productOverviewHeader = document.getElementById('product-overview-header');

const productTitle = document.createElement('h1');
productTitle.textContent = selectedJacket.title;
productOverviewHeader.appendChild(productTitle);

const productPrice = document.createElement('p');
if (selectedJacket.onSale === true){
    productPrice.textContent = '$' + selectedJacket.discountedPrice.toFixed(2);
} else {
    productPrice.classList.add('product-price');
    productPrice.textContent = '$' + selectedJacket.price.toFixed(2);
};
productOverviewHeader.appendChild(productPrice);

const sizes = selectedJacket.sizes;
sizes.forEach((size) => {
    const productSize = document.querySelector('.product-size');
    const sizeButton = document.createElement('p');
    sizeButton.classList.add('product-size__cta');
    sizeButton.textContent = size;

    productSize.appendChild(sizeButton);
});
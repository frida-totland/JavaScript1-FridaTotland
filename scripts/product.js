'use strict';

import { jackets } from "./api.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const selectedJacket = jackets.find((jacket) => {
  return String(jacket.id) === productId;
});

const productOverview = document.querySelector('.product-overview');

const productTitle = document.createElement('h1');
productTitle.textContent = selectedJacket.title;
productOverview.appendChild(productTitle);

const productPrice = document.createElement('p');
if (selectedJacket.onSale === true){
    productPrice.textContent = '$' + selectedJacket.discountedPrice.toFixed(2);
} else {
    productPrice.classList.add('product-price');
    productPrice.textContent = '$' + selectedJacket.price.toFixed(2);
};
productOverview.appendChild(productPrice);

const sizes = selectedJacket.sizes;
sizes.forEach((size) => {
    const productSize = document.querySelector('.product-size');
    const sizeButton = document.createElement('p');
    sizeButton.classList.add('product-size__cta');
    sizeButton.textContent = size;

    productSize.appendChild(sizeButton);
});
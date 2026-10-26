'use strict';

import {jackets } from "./api.js";


const mensJackets = jackets.filter((jacket) => {
    return jacket.tags.includes('mens');
});

const womensJackets = jackets.filter((jacket) => {
    return jacket.tags.includes('womens');
});

mensJackets.forEach((jacket)=> {
    const productGrid = document.querySelector('.product-page__products');
    const productGridContainer = document.createElement('div');
    productGrid.appendChild(productGridContainer);
    productGridContainer.setAttribute('id', jacket.id);

    const productLink = document.createElement('a');
    productLink.href = `product.html?id=${jacket.id}`;

    const productImage = document.createElement('img');
    productImage.setAttribute('src', jacket.image.url);
    productImage.setAttribute('alt', jacket.image.alt);
    productImage.classList.add('product-image');

    const productTitle = document.createElement('h3');
    productTitle.textContent = jacket.title;

    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = '$' + jacket.price.toFixed(2);

    productGridContainer.appendChild(productLink);
    productLink.appendChild(productImage);
    productGridContainer.appendChild(productTitle);
    productGridContainer.appendChild(productPrice);
});

const selectedJacket = jackets.find((jacket) => {
  return String(jacket.id) === productId;
});

console.log(jackets);
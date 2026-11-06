'use strict';

import { getJackets } from "./api.js";
import { showLoading, showError } from "./ui.js";

const jacketsContainer = document.getElementById('jackets-container');

async function init() {
    const loading = showLoading(jacketsContainer);

    try {
        const jackets = await getJackets();
        const featuredJackets = jackets.slice(0, 6);
        featuredJackets.forEach((jacket) => {
            const productGridContainer = document.createElement('div');
            productGridContainer.classList.add('product-card');
            jacketsContainer.appendChild(productGridContainer);
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

    } catch (error) {
        showError(jacketsContainer, 'Could not load products. Please try again later.');
    } finally {
        loading.remove();
    }
};

init();
'use strict';

import { getJackets } from "./api.js";
import { showLoading, showError, createProductCard } from "./ui.js";

const productGrid = document.querySelector('.product-page__products');
const fixedGender = productGrid.dataset.gender;
const productCount = document.getElementById('product-count');

let jackets = [];

function renderProducts() {
    // Remove old cards, but keep the heading and the product count
    const oldCards = document.querySelectorAll('.product-card');
    oldCards.forEach((card) => {
        card.remove();
    });

    // Filter by the selected gender
    let selectedGender;
    if (fixedGender) {
        selectedGender = fixedGender;
    } else {
        selectedGender = document.querySelector('input[name="gender"]:checked').value;
    }

    let visibleJackets = jackets;
    if (selectedGender !== 'all') {
        visibleJackets = jackets.filter((jacket) => {
            return jacket.gender === selectedGender;
        });
    }

    productCount.textContent = visibleJackets.length + ' Products';

    if (visibleJackets.length === 0) {
        const noProducts = document.createElement('p');
        noProducts.classList.add('product-card');
        noProducts.textContent = 'No products found.';
        productGrid.appendChild(noProducts);
        return;
    }

    visibleJackets.forEach((jacket) => {
        productGrid.appendChild(createProductCard(jacket));
    });
}

async function init() {
    const loading = showLoading(productGrid);

    try {
        jackets = await getJackets();
        renderProducts();

        const genderOptions = document.querySelectorAll('input[name="gender"]');
        genderOptions.forEach((option) => {
            option.addEventListener('change', renderProducts);
        });
    } catch (error) {
        showError(productGrid, 'Could not load products. Please try again later.');
    } finally {
        loading.remove();
    }
};

init();
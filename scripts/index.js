'use strict';

import { getJackets } from "./api.js";
import { showLoading, showError, createProductCard } from "./ui.js";

const jacketsContainer = document.getElementById('jackets-container');

async function init() {
    const loading = showLoading(jacketsContainer);

    try {
        const jackets = await getJackets();
        const featuredJackets = jackets.slice(0, 6);
        featuredJackets.forEach((jacket) => {
            jacketsContainer.appendChild(createProductCard(jacket));
        });

    } catch (error) {
        showError(jacketsContainer, 'Could not load products. Please try again later.');
    } finally {
        loading.remove();
    }
};

init();
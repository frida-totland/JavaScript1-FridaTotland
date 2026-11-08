'use strict';

export function showLoading(container){
    const loading = document.createElement('p');
    loading.classList.add('loading');
    loading.textContent = 'Loading...';
    loading.setAttribute('role', 'status');

    container.appendChild(loading);

    return loading;
};

export function showError(container, message){
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    errorMessage.setAttribute('role', 'alert');

    container.appendChild(errorMessage);
};

export function createProductCard(jacket) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.setAttribute('id', jacket.id);

    const link = document.createElement('a');
    link.href = `product.html?id=${jacket.id}`;

    const image = document.createElement('img');
    image.setAttribute('src', jacket.image.url);
    image.setAttribute('alt', jacket.image.alt);
    image.classList.add('product-image');

    const title = document.createElement('h3');
    title.textContent = jacket.title;

    const price = document.createElement('p');
    price.classList.add('product-price');
    if (jacket.onSale) {
        price.classList.add('on-sale');
        price.textContent = '$' + jacket.discountedPrice.toFixed(2);
    } else {
        price.textContent = '$' + jacket.price.toFixed(2);
    }

    link.appendChild(image);
    card.append(link, title, price);

    return card;
};
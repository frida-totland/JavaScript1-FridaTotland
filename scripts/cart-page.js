'use strict';

import { jackets } from "./api.js";
import { getCart } from "./cart.js";

const cart = getCart();
const cartItemsContainer = document.getElementById('cart-items');

cart.forEach((line) => {
    const jacket = jackets.find((jacket) => jacket.id === line.id);
    if(!jacket){
        return;
    }
    
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const jacketImage = document.createElement('img');
    jacketImage.setAttribute('src', jacket.image.url);
    jacketImage.setAttribute('alt', jacket.image.alt);

    const jacketInfo = document.createElement('div');
    jacketInfo.classList.add('item-info');

    const jacketTitle = document.createElement('h2');
    jacketTitle.textContent = jacket.title;

    const jacketSize = document.createElement('p');
    jacketSize.textContent = 'Size: ' + line.size;

    const quantity = document.createElement('div');
    quantity.classList.add('quantity');
    quantity.textContent = line.quantity;

    const jacketPrice = document.createElement('p');
    jacketPrice.classList.add('cart-price');
    jacketPrice.textContent = '$'+ jacket.discountedPrice.toFixed(2);

    const jacketPriceTotal = document.createElement('p');
    jacketPriceTotal.classList.add('cart-price');
    jacketPriceTotal.textContent = '$' + (jacket.discountedPrice * line.quantity).toFixed(2);

    cartItemsContainer.appendChild(cartItem);
    cartItem.append(jacketImage, jacketInfo, quantity, jacketPrice, jacketPriceTotal);
    jacketInfo.append(jacketTitle, jacketSize);

});
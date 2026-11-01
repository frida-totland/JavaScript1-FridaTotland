'use strict';

import { jackets } from "./api.js";
import { getCart, removeFromCart } from "./cart.js";

const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function renderCart(){
    cartItemsContainer.innerHTML = '';

    const cart = getCart();
    if (cart.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty';
        cartItemsContainer.appendChild(emptyCartMessage);

        cartTotal.textContent = '$0.00';
        return;
    }

    let total = 0;

    cart.forEach((line) => {
        const jacket = jackets.find((jacket) => jacket.id === line.id);
        if(!jacket){
            return;
        }

        total += jacket.discountedPrice * line.quantity;

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

        const removeButton = document.createElement('button');
        removeButton.setAttribute('type', 'button');
        removeButton.classList.add('cta', 'remove-button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeFromCart(line.id, line.size);
            renderCart();
        });

        cartItemsContainer.appendChild(cartItem);
        cartItem.append(jacketImage, jacketInfo, quantity, jacketPrice, jacketPriceTotal);
        jacketInfo.append(jacketTitle, jacketSize, removeButton);
    });

    cartTotal.textContent = '$' + total.toFixed(2);
};


renderCart();
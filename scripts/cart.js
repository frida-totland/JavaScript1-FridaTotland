'use strict';

import { jackets } from "./api.js";
import { productId } from "./product.js";

const cartItems = JSON.parse(localStorage.getItem('storedInCart')) || [];

const cartButton = document.getElementById('cart-cta');

cartButton.addEventListener('click', () => {
    cartItems.push(productId);
    localStorage.setItem('storedInCart', JSON.stringify(cartItems));
    //console.Log(cartItems);
    console.log(localStorage.getItem('storedInCart')); // Expected output: null
});
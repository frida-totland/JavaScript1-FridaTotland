'use strict';

// Cart is stored in localStorage as 'storedInCart': an array of
// { id, size, quantity }. One line = one product id + size combination.

const STORAGE_KEY = 'storedInCart';

export function getCart() {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    const cart = JSON.parse(storedCart) || [];

    return cart;
};

export function saveCart(cart) {
    const cartText = JSON.stringify(cart);
    localStorage.setItem(STORAGE_KEY, cartText);

    updateCart();
};

function getCartCount(){
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return totalCount;
};

export function addToCart(id, size){
    const cart = getCart();
    const found = cart.find((item) => item.id === id && item.size === size);
    if(found){
        found.quantity += 1;
    } else {
        cart.push({ id, size, quantity: 1});
    }

    saveCart(cart);
};

function updateCart() {
    const cartIcons = document.querySelectorAll('.cart-icon');
    const totalCount = getCartCount();

    cartIcons.forEach((icon) => {
        let count = icon.querySelector('.cart-item-count');

        if (totalCount === 0) {
            if (count) {
                count.remove();
            }
            return;
        }

        if (!count) {
            count = document.createElement('p');
            count.classList.add('cart-item-count');
            icon.appendChild(count);
        }

        count.textContent = totalCount;
    });
};

updateCart();
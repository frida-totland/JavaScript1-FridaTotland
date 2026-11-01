'use strict';

import { jackets } from "./api.js";
import { getCart, removeFromCart, addToCart, decreaseQuantity } from "./cart.js";

const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const summaryItems = document.getElementById('summary-items');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryTotal = document.getElementById('summary-total');
const checkoutButton = document.getElementById('checkout-button');

function renderCart(){
    cartItemsContainer.innerHTML = '';
    summaryItems.innerHTML = '';

    const cart = getCart();
    if (cart.length === 0) {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty';
        cartItemsContainer.appendChild(emptyCartMessage);

        cartTotal.textContent = '$0.00';
        summarySubtotal.textContent = '$0.00';
        summaryTotal.textContent = '$0.00';

        checkoutButton.hidden = true;

        return;
    }

    checkoutButton.hidden = false;

    let total = 0;

    cart.forEach((line) => {
        const jacket = jackets.find((jacket) => jacket.id === line.id);
        if(!jacket){
            return;
        }

        const linePrice = jacket.discountedPrice * line.quantity;

        // Cart summary
        const summaryProduct = document.createElement('div');
        summaryProduct.classList.add('summary-product');

        const summaryInfo = document.createElement('p');
        summaryInfo.textContent = jacket.title + ' x ' + line.quantity + ', Size: ' + line.size;

        const summaryPrice = document.createElement('p');
        summaryPrice.classList.add('cart-price');
        summaryPrice.textContent = '$'+ linePrice.toFixed(2);

        summaryItems.appendChild(summaryProduct);
        summaryProduct.append(summaryInfo, summaryPrice);

        // Main cart display
        total += linePrice;

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

        const decreaseButton = document.createElement('button');
        decreaseButton.setAttribute('type', 'button');
        decreaseButton.setAttribute('aria-label', 'Decrease quantity');
        decreaseButton.addEventListener('click', () => {
            decreaseQuantity(line.id, line.size);
            renderCart();
        });

        const decreaseIcon = document.createElement('i');
        decreaseIcon.classList.add('fa-solid', 'fa-circle-minus');

        const quantityNumber = document.createElement('p');
        quantityNumber.textContent = line.quantity;

        const addButton = document.createElement('button');
        addButton.setAttribute('type', 'button');
        addButton.setAttribute('aria-label', 'Increase quantity');
        addButton.addEventListener('click', () => {
            addToCart(line.id, line.size);
            renderCart();
        });

        const addIcon = document.createElement('i');
        addIcon.classList.add('fa-solid', 'fa-circle-plus');

        const jacketPrice = document.createElement('p');
        jacketPrice.classList.add('cart-price');
        jacketPrice.textContent = '$'+ jacket.discountedPrice.toFixed(2);

        const jacketPriceTotal = document.createElement('p');
        jacketPriceTotal.classList.add('cart-price');
        jacketPriceTotal.textContent = '$' + linePrice.toFixed(2);

        const removeButton = document.createElement('button');
        removeButton.setAttribute('type', 'button');
        removeButton.classList.add('cta', 'remove-button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeFromCart(line.id, line.size);
            renderCart();
        });

        // Appending elements to the page
        cartItemsContainer.appendChild(cartItem);
        cartItem.append(jacketImage, jacketInfo, quantity, jacketPrice, jacketPriceTotal);
        jacketInfo.append(jacketTitle, jacketSize, removeButton);
        quantity.append(decreaseButton, quantityNumber, addButton);
        decreaseButton.appendChild(decreaseIcon);
        addButton.appendChild(addIcon);
    });

    summaryTotal.textContent = '$' + total.toFixed(2);
    summarySubtotal.textContent = '$' + total.toFixed(2);
    cartTotal.textContent = '$' + total.toFixed(2);
};


renderCart();
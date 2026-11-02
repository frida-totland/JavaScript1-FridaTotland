'use strict';

import { jackets } from "./api.js";
import { getCart } from "./cart.js";

//Rendering the summary
const summaryItems = document.getElementById('summary-items');
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryShipping = document.getElementById('summary-shipping');
const summaryTotal = document.getElementById('summary-total');

function renderSummary(){
    summaryItems.innerHTML = '';

    const cart = getCart();

    if(cart.length === 0){
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty';
        summaryItems.appendChild(emptyCartMessage);
        summarySubtotal.textContent = '$0.00';
        summaryShipping.textContent = '$0.00';
        summaryTotal.textContent = '$0.00';

        return;
    }

    let subtotal = 0;
    
    cart.forEach((line) => {
        const jacket = jackets.find((jacket) => jacket.id === line.id);
        if(!jacket){
            return;
        }

        const linePrice = jacket.discountedPrice * line.quantity;

        const productContainer = document.createElement('div');
        productContainer.classList.add('product');

        const productInfo = document.createElement('p');
        productInfo.textContent = jacket.title + ' x ' + line.quantity + ', Size: ' + line.size;

        const productPrice = document.createElement('p');
        productPrice.textContent = '$' + linePrice.toFixed(2);

        summaryItems.appendChild(productContainer);
        productContainer.append(productInfo, productPrice);

        subtotal += linePrice;
    });

    summarySubtotal.textContent = '$' + subtotal.toFixed(2);

    const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
    const shipping = Number(selectedDelivery.value);

    const total = subtotal + shipping;
    summaryShipping.textContent = '$' + shipping.toFixed(2);
    summaryTotal.textContent = '$' + total.toFixed(2);
};

const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
deliveryOptions.forEach((option) => {
    option.addEventListener('change', renderSummary);
});

renderSummary();
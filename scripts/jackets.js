'use strict';

// fetching jacket details from API
async function fetchJacketDetails() {
    const url = 'https://v2.api.noroff.dev/rainy-days';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch jackets details');
    }

    const json = await response.json();
    const jackets = json.data;

    return jackets;

  } catch (error) {
    console.log(error);
  };
};

const jackets = await fetchJacketDetails();


const mensJackets = jackets.filter((jacket) => {
    return jacket.tags.includes('mens');
});

const womensJackets = jackets.filter((jacket) => {
    return jacket.tags.includes('womens');
});

mensJackets.forEach((jacket)=> {
    const productGrid = document.querySelector('.product-page__products');
    const productGridContainer = document.createElement('div');
    productGrid.appendChild(productGridContainer);
    productGridContainer.setAttribute('id', jacket.id);

    const productImage = document.createElement('img');
    productImage.setAttribute('src', jacket.image.url);
    productImage.setAttribute('alt', jacket.image.alt);
    productImage.classList.add('product-image');

    const productTitle = document.createElement('h3');
    productTitle.textContent = jacket.title;

    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = '$' + jacket.price.toFixed(2);

    productGridContainer.appendChild(productImage);
    productGridContainer.appendChild(productTitle);
    productGridContainer.appendChild(productPrice);
});


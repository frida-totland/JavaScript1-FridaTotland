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
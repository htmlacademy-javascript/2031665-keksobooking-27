import { isEscapeKey } from './util.js';

import { activatePageMap } from './map.js';
const ALERT_OPEN_TIME = 5000;
const body = document.querySelector('body');

export const showAlert = (message) => {
  const alertMessage = document.createElement('div');
  alertMessage.style.zIndex = 10;
  alertMessage.style.position = 'absolute';
  alertMessage.style.left = 0;
  alertMessage.style.top = 0;
  alertMessage.style.right = 0;
  alertMessage.style.padding = '23px 15px';
  alertMessage.style.fontSize = '40px';
  alertMessage.style.textAlign = 'center';
  alertMessage.style.color = 'red';
  alertMessage.style.backgroundColor = '#000000';

  alertMessage.textContent = message;

  document.body.append(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, ALERT_OPEN_TIME);
  activatePageMap(false);
};

const sucsessMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const sucsessMessage = sucsessMessageTemplate.cloneNode(true);
sucsessMessage.classList.add('hidden');
body.appendChild(sucsessMessage);

export const closeSuccessMessage = () => {
  sucsessMessage.classList.add('hidden');
};

sucsessMessage.addEventListener('click', () => {
  closeSuccessMessage();
});

export const openSuccessMessage = () => {
  sucsessMessage.classList.remove('hidden');
};

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButtonElement = errorMessage.querySelector('.error__button');
errorMessage.classList.add('hidden');
body.appendChild(errorMessage);

export const openErrorMessage = () => {
  errorMessage.classList.remove('hidden');
};

const closeErrorMessage = () => {
  errorMessage.classList.add('hidden');
};

errorMessage.addEventListener('click', () => {
  closeErrorMessage();
});

errorButtonElement.addEventListener('click', () => {
  closeErrorMessage();
});

const closeAuxiliaryMessage = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
    closeErrorMessage();
  }
};

document.addEventListener('keydown', closeAuxiliaryMessage);

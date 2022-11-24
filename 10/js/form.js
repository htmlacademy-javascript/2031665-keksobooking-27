import { sendData } from './api.js';
import { openErrorMessage, openSuccessMessage } from './auxiliaryMessages.js';
const adForm = document.querySelector('.ad-form');
const adFormElement = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const slider = adForm.querySelector('.ad-form__slider');


export const inactivPage = function () {
  adForm.classList.add('ad-form--disabled');
  adFormElement.forEach((element) => element.classList.add('disabled'));
  mapFilters.classList.add('ad-form--disabled');
  slider.classList.add('disabled');
};

export const activePage = function () {
  adForm.classList.remove('ad-form--disabled');
  adFormElement.forEach((element) => element.classList.remove('disabled'));
  mapFilters.classList.remove('ad-form--disabled');
  slider.classList.remove('disabled');
};

inactivPage();


export const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span'
}, true);

function validateTitle(value) {
  if (value.length < 30 || value.length > 100) {
    return false;
  } else {
    return true;
  }
}

function validatePrice(value) {
  if (value < 100000) {
    return true;
  } else {
    return false;
  }
}

const roomField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const roomOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

function validateDelivery() {
  return roomOption[roomField.value].includes(capacityField.value);
}

function getDeliveryErrorMessage() {
  return `
  ${roomField.value === '100' ? 'Такое количество гостей невозможно' : 'Количество гостей не соответствует количеству комнат'}
  `;
}

pristine.addValidator(capacityField, validateDelivery, getDeliveryErrorMessage);

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);

pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice,
  'Максимальное значение —100 000'
);

export const resetPristine = () => {
  pristine.reset();
};

export const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(openSuccessMessage, openErrorMessage, new FormData(evt.target));
    }
  });
};


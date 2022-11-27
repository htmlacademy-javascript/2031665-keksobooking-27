import { sendData } from './api.js';
import { openErrorMessage, openSuccessMessage } from './auxiliary-messages.js';

const adForm = document.querySelector('.ad-form');
const adFormElement = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const slider = adForm.querySelector('.ad-form__slider');
const submitButton = adForm.querySelector('.ad-form__submit');
const fetchURL = 'https://27.javascript.pages.academy/keksobooking';
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const MIN_VALUE_FOR_TITLE = 30;
const MAX_VALUE_FOR_TITLE = 100;
const MAX_VALUE_FOR_PRICE = 100000;

const changeTime = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};
timeIn.addEventListener('change', changeTime);
timeOut.addEventListener('change', changeTime);

export const blockSubmitButton = () => {
  submitButton.classList.add('disablet');
};

export const unblockSubmitButton = () => {
  submitButton.classList.remove('disablet');
};

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

export const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span'
}, true);

function validateTitle(value) {
  if (value.length < MIN_VALUE_FOR_TITLE || value.length > MAX_VALUE_FOR_TITLE) {
    return false;
  } else {
    return true;
  }
}

function validatePrice(value) {
  if (value < MAX_VALUE_FOR_PRICE) {
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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  blockSubmitButton();
  const formData = new FormData(evt.target);
  sendData(openSuccessMessage, openErrorMessage, fetchURL, formData);
});

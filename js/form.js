import { sendData } from './api.js';
import { openErrorMessage, openSuccessMessage } from './auxiliary-messages.js';
import { resetFormForAllElements } from './form-reset.js';

const MIN_VALUE_FOR_TITLE = 30;
const MAX_VALUE_FOR_TITLE = 100;
const MAX_VALUE_FOR_PRICE = 100000;
const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');
const fetchURL = 'https://27.javascript.pages.academy/keksobooking';
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const changeTime = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};
timeIn.addEventListener('change', changeTime);
timeOut.addEventListener('change', changeTime);

export const blockSubmitButton = () => {
  submitButton.classList.add('ad-form--disabled');
};

export const unblockSubmitButton = () => {
  submitButton.classList.remove('ad-form--disabled');
};

export const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span'
}, true);

const validateTitle = (value) => value.length > MIN_VALUE_FOR_TITLE && value.length < MAX_VALUE_FOR_TITLE;

const validatePrice = (value) => value < MAX_VALUE_FOR_PRICE;

const roomField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const roomOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const validateDelivery = () => roomOption[roomField.value].includes(capacityField.value);

const getDeliveryErrorMessage = () => `
  ${roomField.value === '100' ? 'Такое количество гостей невозможно' : 'Количество гостей не соответствует количеству комнат'}
  `;

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

const successDataAction = () => {
  openSuccessMessage();
  unblockSubmitButton();
  resetFormForAllElements();
};

const errorDataActions = () => {
  openErrorMessage();
  unblockSubmitButton();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  blockSubmitButton();
  const formData = new FormData(evt.target);
  sendData(successDataAction, errorDataActions, fetchURL, formData);
});

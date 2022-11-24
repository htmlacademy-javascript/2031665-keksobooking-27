import { openErrorMessage } from './auxiliaryMessages.js';
const fetchURL = 'https://27.javascript.pages.academy/keksobooking';
const fetchURLData = 'https://27.javascript.pages.academy/keksobooking/data';

export const getData = (onSuccess) => {
  fetch(fetchURLData)
    .then((response) => response.json())
    .then((cards) => {
      onSuccess(cards);
    });
};

export const sendData = (onSuccess, onFail, bodyData) => {
  fetch(fetchURL,
    {
      method: 'POST',
      body: bodyData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

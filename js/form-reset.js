import { resetPristine } from './form.js';
import { resetMarkPosition, closePopup } from './map.js';
import { createMarker, initialMainMarkerValue } from './map.js';
import { resetSlider } from './slider.js';

const buttonReset = document.querySelector('.ad-form__reset');
const adForm = document.querySelector('.ad-form');
const mapFormElement = document.querySelector('.map__filters');
const addressElement = document.querySelector('#address');

export const resetFormForAllElements = () => {
  adForm.reset();
  resetPristine();
  mapFormElement.reset();
  resetMarkPosition();
  closePopup();
  createMarker();
  resetSlider();
  addressElement.innerHTML = initialMainMarkerValue();
};

buttonReset.addEventListener('click', () => {
  resetFormForAllElements();
});

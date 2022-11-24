import { resetPristine } from './form.js';
import { resetMarkPosition, closePopup } from './map.js';

const buttonReset = document.querySelector('.ad-form__reset');

export const resetFormForAllElements = function(){
  resetPristine();
  resetMarkPosition(buttonReset);
  closePopup();
};

buttonReset.addEventListener('click', (evt) => {
  resetFormForAllElements();
});

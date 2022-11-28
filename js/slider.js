const MIN_SLIDER_PRICE = 0;
const MAX_SLIDER_PRICE = 100000;

export const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');
const typeElement = document.querySelector('#type');

const MinTypePrice = {
  BUNGALOW: '0',
  FLAT: '1000',
  HOTEL: '3000',
  HOUSE: '5000',
  PALACE: '10000'
};

noUiSlider.create(sliderElement, {
  range: {
    min: MIN_SLIDER_PRICE,
    max: MAX_SLIDER_PRICE,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value)
  },
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

valueElement.addEventListener('change', () => {
  sliderElement.noUiSlider.set(valueElement.value);
});

const getMinPrice = () => Number(MinTypePrice[typeElement.value.toUpperCase()]);
typeElement.addEventListener('change', () => {
  const minPriceValue = getMinPrice();
  sliderElement.noUiSlider.updateOptions({
    start: minPriceValue,
  });
  valueElement.value = minPriceValue;
  valueElement.placeholder = minPriceValue;
});

export const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start: 1000,
  });
};


import { debounce } from './util.js';
import { deleteMarkerGroupLayer, createMarker, closePopup } from './map.js';
const BEFORE_MIDDLE_PRICE = 10000;
const AFTER_MIDDLE_PRICE = 50000;
const MAX_CARDS_ON_MAP = 10;
const DELAY = 500;
const houseType = document.querySelector('[name="housing-type"]');
const housePrice = document.querySelector('[name="housing-price"]');
const houseRooms = document.querySelector('[name="housing-rooms"]');
const houseGuests = document.querySelector('[name="housing-guests"]');
const anyValue = 'any';
const featureWifi = document.querySelector('#filter-wifi');
const featureDishwasher = document.querySelector('#filter-dishwasher');
const featureParking = document.querySelector('#filter-parking');
const featureWasher = document.querySelector('#filter-washer');
const featureElevator = document.querySelector('#filter-elevator');
const featureConditioner = document.querySelector('#filter-conditioner');
const arrayFiltersFeatures = [featureWifi, featureDishwasher, featureParking, featureWasher, featureElevator, featureConditioner];
export const tenCardElements = [];
const mapForm = document.querySelector('.map__filters');

const checkType = (card) => {
  if (houseType.value === card.offer.type || houseType.value === anyValue) {
    return true;
  }
};
houseType.value = housePrice.value = houseRooms.value = houseGuests.value = anyValue;

const checkPrice = (card) => {
  if ((housePrice.value === anyValue) ||
    (housePrice.value === 'low' && card.offer.price <= BEFORE_MIDDLE_PRICE) ||
    (housePrice.value === 'middle' && card.offer.price > BEFORE_MIDDLE_PRICE && card.offer.price <= AFTER_MIDDLE_PRICE) ||
    (housePrice.value === 'high' && card.offer.price > AFTER_MIDDLE_PRICE)) {
    return true;
  }
};

const checkRooms = (card) => {
  if (houseRooms.value === anyValue ||
    (houseRooms.value === '1' && houseRooms.value === String(card.offer.rooms)) ||
    (houseRooms.value === '2' && houseRooms.value === String(card.offer.rooms)) ||
    (houseRooms.value === '3' && houseRooms.value === String(card.offer.rooms)) ||
    (houseRooms.value === '100' && houseRooms.value === String(card.offer.rooms))) {
    return true;
  }
};

const checkGuests = (card) => {
  if (houseRooms.value === anyValue ||
    (houseRooms.value === '3' && houseRooms.value === String(card.offer.guests)) ||
    (houseRooms.value === '2' && houseRooms.value === String(card.offer.guests)) ||
    (houseRooms.value === '1' && houseRooms.value === String(card.offer.guests)) ||
    (houseRooms.value === '0' && houseRooms.value === String(card.offer.guests))) {
    return true;
  }
};

const checkFeatures = (cardFeatures) => {
  if (cardFeatures.offer.features === undefined) {
    cardFeatures.offer.features = [];
  }
  if ((featureWifi.checked || featureDishwasher.checked || featureParking.checked ||
    featureWasher.checked || featureElevator.checked || featureConditioner.checked) === anyValue) {

    return true;
  }
  const arrayElementsChecked = [];
  for (let i = 0; i < arrayFiltersFeatures.length; i++) {
    if (arrayFiltersFeatures[i].checked === true) {
      arrayElementsChecked.push(arrayFiltersFeatures[i].value);

    }
  }
  const arrayAmountEqualElements = [];
  for (let i = 0; i < arrayElementsChecked.length; i++) {
    if (cardFeatures.offer.features.includes(arrayElementsChecked[i])) {
      arrayAmountEqualElements.push(arrayElementsChecked[i]);
    }
  }
  if (arrayAmountEqualElements.length === arrayElementsChecked.length) {
    return true;
  }
};

const applyFilter = (evt, card) => {
  closePopup();
  deleteMarkerGroupLayer();
  if (!(evt.target.nodeName === 'SELECT' || evt.target.nodeName === 'INPUT')) {
    return null;
  }
  const resultArray = [];
  for (let i = 0; i < card.length; i++) {
    if (checkType(card[i]) && checkPrice(card[i]) && checkRooms(card[i]) && checkGuests(card[i]) && checkFeatures(card[i])) {
      if (resultArray.length === MAX_CARDS_ON_MAP) {
        break;
      }
      resultArray.push(card[i]);
    }
  }
  createMarker(resultArray);
};

export const getFilteredData = (card) => {
  for (const element of card) {
    tenCardElements.push(element);
    if (tenCardElements.length === MAX_CARDS_ON_MAP) {
      break;
    }
  }
  createMarker(tenCardElements);
  mapForm.addEventListener('change', debounce((evt) => applyFilter(evt, card), DELAY));
};

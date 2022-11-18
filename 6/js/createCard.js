import { generateArray } from './data.js';

const makeElement = function (tagName, className, text) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

const createCard = function (product) {
  const listItem = makeElement('article', 'popup');
  const title = makeElement('h3', 'popup__title', product.offer.title);
  listItem.appendChild(title);
  const address = makeElement('p', 'popup__text--address', product.offer.address);
  listItem.appendChild(address);
  const price = makeElement('p', 'popup__text--price', `${product.offer.price} ₽/ночь`);
  listItem.appendChild(price);
  function whichType() {
    const typeOfHouse = product.offer.type;
    if (typeOfHouse === 'flat') {
      return 'Квартира';
    } else if (typeOfHouse === 'bungalow') {
      return 'Бунгало';
    } else if (typeOfHouse === 'house') {
      return 'Дом';
    } else if (typeOfHouse === 'palace') {
      return 'Дворец';
    } else if (typeOfHouse === 'hotelra') {
      return 'Отель';
    }
  }
  const type = makeElement('h4', 'popup__type', whichType());
  listItem.appendChild(type);
  const sizeRoom = makeElement('p', 'popup__text--capacity', `${product.offer.rooms} комнаты для ${product.offer.guests} гостей`);
  listItem.appendChild(sizeRoom);
  const checkTime = makeElement('p', 'popup__text--time', `Заезд после ${product.offer.checkin} выезд до ${product.offer.checkout}`);
  listItem.appendChild(checkTime);
  const features = makeElement('ul', 'popup__features');
  listItem.appendChild(features);
  const featureArray = product.offer.features;
  for (let i = 0; i < featureArray.length; i++) {
    const featuresItem = makeElement('li', 'popup__feature', featureArray[i]);
    const featuresItemOne = featureArray[i];
    if (featuresItemOne === 'wifi') {
      featuresItem.classList.add('popup__feature--wifi');
    } else if (featuresItemOne === 'dishwasher') {
      featuresItem.classList.add('popup__feature--dishwasher');
    } else if (featuresItemOne === 'parking') {
      featuresItem.classList.add('popup__feature--parking');
    } else if (featuresItemOne === 'washer') {
      featuresItem.classList.add('popup__feature--washer');
    } else if (featuresItemOne === 'elevator') {
      featuresItem.classList.add('popup__feature--elevator');
    } else if (featuresItemOne === 'conditioner') {
      featuresItem.classList.add('popup__feature--conditioner');
    }
    features.appendChild(featuresItem);
  }
  const description = makeElement('p', 'popup__description', product.offer.description);
  listItem.appendChild(description);
  const photoList = makeElement('div', 'popup__photos');
  listItem.appendChild(photoList);
  const photoArray = product.offer.photo;
  for (let i = 0; i < photoArray.length; i++) {
    const photos = makeElement('img', 'popup__photos', photoArray[i]);
    photoList.appendChild(photos);
  }
  const picture = makeElement('img', 'popup__avatar');
  picture.src = product.author.avatar;
  picture.alt = 'Фото жилья';
  listItem.appendChild(picture);
  return listItem;
};

const elementsArray = generateArray();
export const createCards = function () {
  const cards = [];
  for (let i = 0; i < elementsArray.length; i++) {
    cards[i] = createCard(elementsArray[i]);
  }
  return cards;
};
let firstCard = createCards();
const getCard = function () {
  for (let i = 0; i < firstCard.length; i++) {
    firstCard = firstCard[i];
  }
  return firstCard;
};
firstCard = getCard();
const templateProfile = document.querySelector('#card').content;
const article = templateProfile.querySelector('.popup');
let task = article.cloneNode(true);
task = firstCard;
const containerMessages = document.querySelector('.map__canvas');
containerMessages.appendChild(task);

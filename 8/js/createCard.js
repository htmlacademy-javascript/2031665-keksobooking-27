import { generateArray } from './data.js';
const cardTemplate = document.querySelector('#card').content;

const typeOfHouse = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotelra: 'Отель'
};

const createCard = function (cardData) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = cardData.offer.title;
  card.querySelector('.popup__text--price').textContent = `${cardData.offer.price} ₽/ночь`;
  card.querySelector('.popup__text--address').textContent = cardData.offer.address;
  card.querySelector('.popup__type').textContent = typeOfHouse[cardData.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${cardData.offer.checkin} выезд до ${cardData.offer.checkout}`;
  if (cardData.offer.features.length !== 0) {
    card.querySelector('.popup__features').innerHTML = '';
    let feature;
    for (let i = 0; i < cardData.offer.features.length; i++) {
      feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add(`popup__feature--${cardData.offer.features[i]}`);
      card.querySelector('.popup__features').appendChild(feature);
    }
  } else {
    card.querySelector('.popup__features').remove();
  }
  const photoTemplate = card.querySelector('.popup__photo');
  card.querySelector('.popup__photos').innerHTML = '';
  let photography;
  for (let j = 0; j < cardData.offer.photo.length; j++) {
    photography = photoTemplate.cloneNode(true);
    photography.src = cardData.offer.photo[j];
    card.querySelector('.popup__photos').appendChild(photography);
  }
  card.querySelector('.popup__description').textContent = cardData.offer.description;
  card.querySelector('.popup__avatar').src = cardData.author.avatar;

  return card;
};

export const renderCard = function (card) {
  const map = document.querySelector('.map__canvas');
  map.appendChild(card);
};

const data = generateArray();
const firstCardData = data[0];
const firstCard = createCard(firstCardData);
renderCard(firstCard);

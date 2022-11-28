const cardTemplate = document.querySelector('#card').content;

export const typeOfHouse = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotelra: 'Отель'
};

export const createCard = (cardData) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = cardData.offer.title;
  card.querySelector('.popup__text--price').textContent = `${cardData.offer.price} ₽/ночь`;
  card.querySelector('.popup__text--address').textContent = cardData.offer.address;
  card.querySelector('.popup__type').textContent = typeOfHouse[cardData.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${cardData.offer.checkin} выезд до ${cardData.offer.checkout}`;
  const similarCard = cardData;
  if (similarCard.offer.features === undefined) {
    card.querySelector('.popup__features').hidden = true;
  } else {
    const featuresArray = similarCard.offer.features;
    const featuresContainerElement = card.querySelector('.popup__features');
    const featureListFragment = document.createDocumentFragment();
    featuresArray.forEach((features) => {
      const featureListItem = featuresContainerElement.querySelector(`.popup__feature--${features}`);

      if (featureListItem) {
        featureListFragment.append(featureListItem);
      }
    });
    featuresContainerElement.innerHTML = '';
    featuresContainerElement.append(featureListFragment);
  }

  if (cardData.offer.photos !== undefined && cardData.offer.photos.length !== 0) {
    const photoTemplate = card.querySelector('.popup__photo');
    card.querySelector('.popup__photos').innerHTML = '';
    let photography;
    for (let j = 0; j < cardData.offer.photos.length; j++) {
      photography = photoTemplate.cloneNode(true);
      photography.src = cardData.offer.photos[j];
      card.querySelector('.popup__photos').appendChild(photography);
    }
  } else {
    card.querySelector('.popup__photos').remove();
  }
  card.querySelector('.popup__description').textContent = cardData.offer.description;
  card.querySelector('.popup__avatar').src = cardData.author.avatar;
  return card;
};

export const renderCards = (cardsData) => {
  const array = [];
  cardsData.forEach((cardData) => {
    array.push(createCard(cardData));
  });
  return array;
};

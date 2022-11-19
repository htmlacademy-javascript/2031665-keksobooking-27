const templateProfile = document.querySelector('#card').content;
const article = templateProfile.querySelector('.popup');

const typeOfHouse = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotelra: 'Отель'
};

const createCard = function (product) {
  const task = article.cloneNode(true);
  const containerMessages = document.querySelector('.map__canvas');
  task.querySelector('.popup__title').textContent = product.offer.title;
  task.querySelector('.popup__text--price').textContent = `${product.offer.price} ₽/ночь`;
  task.querySelector('.popup__text--address').textContent = product.offer.address;
  task.querySelector('.popup__type').textContent = typeOfHouse[product.offer.type];
  task.querySelector('.popup__text--capacity').textContent = `${product.offer.rooms} комнаты для ${product.offer.guests} гостей`;
  task.querySelector('.popup__text--time').textContent = `Заезд после ${product.offer.checkin} выезд до ${product.offer.checkout}`;
  if (product.offer.features.length !== 0) {
    task.querySelector('.popup__features').innerHTML = '';
    let feature;
    for (let i = 0; i < product.offer.features.length; i++) {
      feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add(`popup__feature--${product.offer.features[i]}`);
      task.querySelector('.popup__features').appendChild(feature);
    }
  } else {
    task.querySelector('.popup__features').remove();
  }
  const photoTemplate = task.querySelector('.popup__photo');
  task.querySelector('.popup__photos').innerHTML = '';
  let photography;
  for (let j = 0; j < product.offer.photo.length; j++) {
    photography = photoTemplate.cloneNode(true);
    photography.src = product.offer.photo[j];
    task.querySelector('.popup__photos').appendChild(photography);
  }
  task.querySelector('.popup__description').textContent = product.offer.description;
  task.querySelector('.popup__avatar').src = product.author.avatar;
  containerMessages.appendChild(task);
  return task;
};

export const createCards = function (data) {
  const cards = [];
  cards.push(createCard(data[0]));
  return cards;
};

export const place = [
  'место',
  'гнездышко',
  'предложение',
  'приключение',
  'пристанище',
  'жилье',
  'укрытие',
  'прибежище'
];

export const checkin = [
  '12:00',
  '13:00',
  '14:00'
];

export const checkout = [
  '12:00',
  '13:00',
  '14:00'
];

export const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

export const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

export const description = [
  'Лучшее',
  'Красивое',
  'Уютное',
  'Приятное',
  'Милое',
  'Удивительное',
  'Популярное',
  'Сказочное'
];

export const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

export const MAX_IMAGE_INDEX = 10;
export const MAX_PRICE_FOR_ROOM = 14000;
export const MAX_NUMBER_GUESTS = 8;
export const MAX_NUMBER_ROOMS = 14;
export const MIN_LAT_LOCATION_VALUE = 35.65000;
export const MAX_LAT_LOCATION_VALUE = 35.70000;
export const MIN_LNG_LOCATION_VALUE = 139.70000;
export const MAX_LNG_LOCATION_VALUE = 139.80000;
const LATITUDE = 90;
const LONGITUDE = 180;

function getRandom(min, max) {
  if (min >= max || min <= 0) {
    return NaN;
  } else {
    return Math.random() * (max - min + 1) + min;
  }
}

export function getRandomNumber(min, max) {
  return Math.round(getRandom(min, max));
}

export function getRandomNumberDot(min, max, dot) {
  return getRandom(min, max).toFixed(dot);
}

getRandom();
getRandomNumber();
getRandomNumberDot();


export function getRandomArrayElement(elements) {
  const random = (getRandomNumber(1, elements.length - 1)) - 1;
  return elements[random];
}

export const createPlaceTitle = function () {
  return `${getRandomArrayElement(description)} ${getRandomArrayElement(place)}`;
};

export const getImageByIndex = function (i) {
  if (i < MAX_IMAGE_INDEX) {
    return `img/avatar/user0${i}.png`;
  } else {
    return `img/avatar/user${i}.png`;
  }
};

export const getMapAddress = function () {
  return `lat: ${getRandomNumberDot(1, LATITUDE, 3)}, lng:${getRandomNumberDot(1, LONGITUDE, 3)}`;
};

export function getRandomLength(arr) {
  return arr.slice(0, getRandomNumber(1, features.length));
}

export function getFeatures(arr) {
  let newArray = [];
  for (let i = 0; i <= features.length; i++) {
    newArray = arr.sort(() => Math.random() - 0.5);
    newArray = getRandomLength(newArray);
  }
  return newArray;
}

import {getImageByIndex, createPlaceTitle, getMapAddress, getRandomNumber, getRandomArrayElement, getFeatures, getRandomLength, getRandomNumberDot} from './util.js';

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

const checkin = [
  '12:00',
  '13:00',
  '14:00'
];

const checkout = [
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

const photos = [
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

const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

export const MAX_IMAGE_INDEX = 10;
const MAX_PRICE_FOR_ROOM = 14000;
const MAX_NUMBER_GUESTS = 8;
const MAX_NUMBER_ROOMS = 4;
const MIN_LAT_LOCATION_VALUE = 35.65000;
const MAX_LAT_LOCATION_VALUE = 35.70000;
const MIN_LNG_LOCATION_VALUE = 139.70000;
const MAX_LNG_LOCATION_VALUE = 139.80000;
export const LATITUDE = 90;
export const LONGITUDE = 180;

export const generateArray = function () {
  const result = [];
  for (let i = 1; i <= MAX_IMAGE_INDEX; i++) {
    const objectResult = {
      author: {
        avatar: getImageByIndex(i)
      },
      offer: {
        title: createPlaceTitle(description, place),
        address: getMapAddress(),
        price: getRandomNumber(1, MAX_PRICE_FOR_ROOM),
        type: getRandomArrayElement(type),
        rooms: getRandomNumber(1, MAX_NUMBER_ROOMS),
        guests: getRandomNumber(1, MAX_NUMBER_GUESTS),
        checkin: getRandomArrayElement(checkin),
        checkout: getRandomArrayElement(checkout),
        features: getFeatures(features),
        description: 'Апарт-отель Urban Serviced Apartments с рестораном и баром расположен в 1 км от Музейного квартала. Осуществляется доставка еды и напитков в апартаменты.',
        photo: getRandomLength(photos)
      },
      location: {
        lat: getRandomNumberDot(MIN_LAT_LOCATION_VALUE, MAX_LAT_LOCATION_VALUE, 5),
        lng: getRandomNumberDot(MIN_LNG_LOCATION_VALUE, MAX_LNG_LOCATION_VALUE, 5)
      }
    };
    result[i - 1] = objectResult;
  }
  return result;
};

generateArray();

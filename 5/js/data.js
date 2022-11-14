import {MAX_IMAGE_INDEX, getImageByIndex, createPlaceTitle, place, getMapAddress, getRandomNumber, MAX_PRICE_FOR_ROOM, getRandomArrayElement, MAX_NUMBER_ROOMS, MAX_NUMBER_GUESTS, checkin, checkout, getFeatures, features, getRandomLength, photos, getRandomNumberDot, MIN_LAT_LOCATION_VALUE, MAX_LAT_LOCATION_VALUE, MIN_LNG_LOCATION_VALUE, MAX_LNG_LOCATION_VALUE, description, type} from './util.js';

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

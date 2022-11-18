import {description, LATITUDE, LONGITUDE, place, MAX_IMAGE_INDEX, features} from './data.js';

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

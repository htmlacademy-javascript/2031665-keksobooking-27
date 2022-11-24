import { renderCards } from './createCard.js';
import { renderMarkers } from './map.js';
import { setUserFormSubmit } from './form.js';
import { getData } from './api.js';
const SIMILAR_CARDS_COUNT = 10;

getData((cards) => {
  renderCards(cards);
  renderMarkers(cards.slice(0, SIMILAR_CARDS_COUNT));
});

setUserFormSubmit();

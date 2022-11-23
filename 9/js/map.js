import { activePage } from './form.js';
import { createCard } from './createCard.js';
import { generateArray } from './data.js';
const countryCenterLat = 35.6761919;
const countryCenterLng = 139.6503106;
const mapForm = document.querySelector('.map__filters');
export const map = L.map('map-canvas')
  .on('load', () => {
    activePage();
  })
  .setView({
    lat: countryCenterLat,
    lng: countryCenterLng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: countryCenterLat,
    lng: countryCenterLng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mapForm.addEventListener('change', () => {
  mainPinMarker.setLatLng({
    lat: countryCenterLat,
    lng: countryCenterLng,
  });

  map.setView({
    lat: countryCenterLat,
    lng: countryCenterLng,
  }, 10);
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (cardData) => {
  const lat = cardData.location.lat;
  const lng = cardData.location.lng;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    }
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createCard(cardData));
};

generateArray().forEach((cardData) => {
  createMarker(cardData);
});

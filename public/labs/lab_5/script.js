function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  var mymap = L.map('mapid').setView([38.987, -76.943], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZG9udXRkb29tc2RheSIsImEiOiJja202dDU4MG8wcm53MnFvOXRmbzBkbmV5In0.F-Fpfjwcoo0qwDWVxjV4XQ'
}).addTo(mymap);

var marker = L.marker([38.987, -76.943]).addTo(mymap);
  return map;
}

/*async function dataHandler(mapObjectFromFunction) {
const form = document.querySelector('#search-form');
const form = document.querySelector('#search');
const form = document.querySelector('.target-list');
const form = document.querySelector('.reply-message');

const request = await fetch('/api');
const data = await request.json();
} */

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;// this code was written with the help of Wes Bos' great tutorial at https://www.youtube.com/watch?v=y4gZMJKAeWs //

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const cities = [];

fetch(endpoint)
.then(blob => blob.json())
.then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.name.match(regex) || place.city.match(regex)
  });
}

function clearMatches() {
  const matchArray = [];
  return ``
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.
    value}</span>`);
    return `
    <li>
      <span class="name"><div class='taco'>${place.name}</div> <address>${place.zip}</address> <div class='citystate'> ${place.city}, ${place.state}</div></span>
      <span class="category">${place.geocoded_column_1}</span>
    </li>

    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('input', displayMatches);

searchInput.addEventListener('keyup', clearMatches);


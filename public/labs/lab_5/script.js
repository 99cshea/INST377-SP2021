//const { map } = require("cypress/types/bluebird");

function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.987, -76.943], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZG9udXRkb29tc2RheSIsImEiOiJja202dDU4MG8wcm53MnFvOXRmbzBkbmV5In0.F-Fpfjwcoo0qwDWVxjV4XQ'
}).addTo(mymap);

  console.log('mymap', mymap)

  return mymap;
}

async function dataHandler(mapFromLeaflet) {
  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');

  const request = await fetch('/api');
  const data = await request.json();
 //const firstfive = filtered.slice(5)

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('form submitted');
    const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    const firstfive = filtered.slice(0,5)
    //const mymap = L.map('mapid').setView([longLat[1], longLat[0]], 13);
    console.table(firstfive);

    firstfive.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      console.log('markerLongLat', longLat[0], longLat[1]);
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromLeaflet);

      const appendItem = document.createElement('li');
      appendItem.classList.add('block');
      appendItem.classList.add('list-item');
      appendItem.innerHTML = `<span><div class="list-header is-size-5>${item.name}</span></div> 
      <span><div><address class="is-size-6">${item.name} ${item.address_line_1}</address></div></span>`;
      targetList.append(appendItem);

    });
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
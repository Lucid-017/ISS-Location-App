"use strict";

//getting map tiles
var map = L.map('issMap').setView([0, 0], 13);
var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; //attribution 

var attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">openStreetMap</a> contributors';
var tiles = L.tileLayer(tileUrl, {
  attribution: attribution
});
tiles.addTo(map); //marker custom icon

var issIcon = L.icon({
  iconUrl: 'intiss.svg',
  iconSize: [80, 76],
  iconAnchor: [30, 41]
});
var marker = L.marker([0, 0], {
  icon: issIcon
}).addTo(map);
var circle = L.circle([0, 0], 1000, {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map); //L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
//storing the ISS data in a variable

var url_api = 'https://api.wheretheiss.at/v1/satellites/25544'; // let firstTime = true;
//creating an asynchronous operation

function getData() {
  var response, data, latitude, longitude, velocity, visibility, today, hour, mins, sec, amPm, time;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url_api));

        case 2:
          response = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(response.json());

        case 5:
          data = _context.sent;
          // destructing the data into specific parts
          console.log(data);
          latitude = data.latitude, longitude = data.longitude, velocity = data.velocity, visibility = data.visibility; //

          marker.setLatLng([latitude, longitude]);
          circle.setLatLng([latitude, longitude], 1000); //do time

          today = new Date();
          hour = today.getHours();
          mins = today.getMinutes();
          sec = today.getSeconds();
          amPm = 'Am';

          if (hour > 12) {
            amPm = 'Pm';
            hour = hour - 12;
          }

          time = "".concat(hour, " : ").concat(mins, " : ").concat(sec, " ").concat(amPm, " PST"); //selecting and assigning innerhtml

          document.getElementById('lat').textContent = latitude.toFixed(2);
          document.getElementById('lon').textContent = longitude.toFixed(2);
          document.getElementById('vel').textContent = velocity.toFixed(2) + ' mph'; //condition for the visibility output

          if (visibility === 'eclipsed') {
            document.getElementById('visi').textContent = visibility;
            document.getElementById('visidiv').style.background = 'black';
            document.getElementById('visidiv').style.color = 'white';
          } else if (visibility === 'daylight') {
            document.getElementById('visi').textContent = visibility;
            document.getElementById('visidiv').style.background = 'yellow';
            document.getElementById('visidiv').style.color = 'black';
          }

          document.getElementById('time').textContent = time;

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
}

getData();
setInterval(getData, 1000);
"use strict";

var map = L.map('iMap').setView([0, 0], 4);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibHVjaWQtMDE5IiwiYSI6ImNrc3RvMHM4cjAwZG0yb28zMmVsMW90a2IifQ.w_GSxFB4LLhwQYJaGTpOFw'
}).addTo(map);
var issIcon = L.icon({
  iconUrl: 'intiss.svg',
  iconSize: [80, 76],
  iconAnchor: [30, 41]
});
var marker = L.marker([51.508, -0.11], {
  icon: issIcon
}).addTo(map);
var circle = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);
var myZoom = {
  start: map.getZoom(),
  end: map.getZoom()
};
console.log(map.getZoom());
console.log(circle.getRadius());
map.on('zoomstart', function (e) {
  myZoom.start = map.getZoom();
});
map.on('zoomend', function (e) {
  myZoom.end = map.getZoom();
  var diff = myZoom.start - myZoom.end;
  console.log(diff);

  if (diff > 0) {
    circle.setRadius(circle.getRadius() * 2);
  } else if (diff < 0) {
    circle.setRadius(circle.getRadius() - 1);
  }
});
console.log(circle.getRadius()); //storing the ISS data in a variable

var url_api = 'https://api.wheretheiss.at/v1/satellites/25544'; // let firstTime = true;
//creating an asynchronous operation

function getData() {
  var response, data, latitude, longitude, velocity, visibility, today, hour, mins, sec, amPm, time, spaceview;
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

          map.setView([latitude, longitude]);
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

          time = "".concat(hour, " : ").concat(mins, " : ").concat(sec, " ").concat(amPm, " PST"); //
          // if (firstTime) {
          //     map.setView([latitude, longitude], 2);
          //     firstTime = false;
          //   }

          document.getElementById('lat').textContent = latitude.toFixed(2);
          document.getElementById('lon').textContent = longitude.toFixed(2);
          document.getElementById('vel').textContent = velocity.toFixed(2) + ' mph';

          if (visibility === 'eclipsed') {
            spaceview = document.getElementById('visi').textContent = visibility;
            document.getElementById('visidiv').style.background = 'white';
            document.getElementById('visidiv').style.color = 'black';
          } else if (visibility === 'daylight') {
            document.getElementById('visi').textContent = visibility;
            document.getElementById('visidiv').style.background = 'yellow';
            document.getElementById('visidiv').style.color = 'black';
          }

          document.getElementById('time').textContent = time;

        case 23:
        case "end":
          return _context.stop();
      }
    }
  });
}

getData();
setInterval(getData, 1000);
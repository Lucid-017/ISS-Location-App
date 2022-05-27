var map = L.map('iMap').setView([0, 0], 4);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVjaWQtMDE5IiwiYSI6ImNrc3RvMHM4cjAwZG0yb28zMmVsMW90a2IifQ.w_GSxFB4LLhwQYJaGTpOFw'
}).addTo(map);

const issIcon = L.icon({
    iconUrl: 'intiss.svg',
    iconSize: [80, 76],
    iconAnchor: [30, 41],
});
const marker =L.marker([51.508, -0.11], {icon: issIcon}).addTo(map);


var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius:500
}).addTo(map);

var myZoom = {
    start:  map.getZoom(),
    end: map.getZoom()
  };
  console.log(map.getZoom())
  console.log(circle.getRadius())

  map.on('zoomstart', function(e) {
     myZoom.start = map.getZoom();
  });
  
  map.on('zoomend', function(e) {
      myZoom.end = map.getZoom();
      var diff = myZoom.start - myZoom.end;
      console.log(diff)
      if (diff > 0) {
          circle.setRadius(circle.getRadius() *2);
      } else if (diff < 0) {
          circle.setRadius(circle.getRadius() -1);
      }
  });
      console.log(circle.getRadius())

      //storing the ISS data in a variable
const url_api = 'https://api.wheretheiss.at/v1/satellites/25544'


// let firstTime = true;
//creating an asynchronous operation
async function getData(){
    //fetching the data from the url_api variable
    const response = await fetch(url_api);
    //parsing the fetched data into javascript object nottion(json)
    const data = await response.json();
    // destructing the data into specific parts
    console.log(data)
    const {latitude,longitude,velocity,visibility} = data
    //
    map.setView([latitude,longitude])
    marker.setLatLng([latitude, longitude])
    circle.setLatLng([latitude,longitude],1000)
    //do time
    const today = new Date()
    let hour =today.getHours()
    const mins =today.getMinutes()
    const sec =today.getSeconds()
    let amPm = 'Am'
    if(hour >12){
        amPm = 'Pm'
        hour = hour -12;
    }
    var time = `${hour} : ${mins} : ${sec} ${amPm} PST`
    //
    // if (firstTime) {
    //     map.setView([latitude, longitude], 2);
    //     firstTime = false;
    //   }
    document.getElementById('lat').textContent=latitude.toFixed(2)
    document.getElementById('lon').textContent=longitude.toFixed(2)
    document.getElementById('vel').textContent=velocity.toFixed(2) + ' mph'
  if(visibility ==='eclipsed'){
    let spaceview=document.getElementById('visi').textContent=visibility
    document.getElementById('visidiv').style.background = 'white'
    document.getElementById('visidiv').style.color = 'black'
  } else if(visibility ==='daylight'){
    document.getElementById('visi').textContent=visibility
    document.getElementById('visidiv').style.background = 'yellow'
    document.getElementById('visidiv').style.color = 'black'
  } 
    document.getElementById('time').textContent=time
}

getData()
 setInterval(getData,1000)

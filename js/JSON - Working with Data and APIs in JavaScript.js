//getting map tiles
var map = L.map('issMap').setView([0, 0], 13);
const tileUrl= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//attribution 
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">openStreetMap</a> contributors'
const tiles = L.tileLayer(tileUrl,{attribution})
tiles.addTo(map)
//marker custom icon
const issIcon = L.icon({
    iconUrl: 'intiss.svg',
    iconSize: [80, 76],
    iconAnchor: [30, 41],
});
const marker =L.marker([0, 0], {icon: issIcon}).addTo(map);
var circle = L.circle([0, 0], 1000, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
//L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

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
    //selecting and assigning innerhtml
    document.getElementById('lat').textContent=latitude.toFixed(2)
    document.getElementById('lon').textContent=longitude.toFixed(2)
    document.getElementById('vel').textContent=velocity.toFixed(2) + ' mph'
    //condition for the visibility output
  if(visibility ==='eclipsed'){
    document.getElementById('visi').textContent=visibility
    document.getElementById('visidiv').style.background = 'black'
    document.getElementById('visidiv').style.color = 'white'
  } else if(visibility ==='daylight'){
    document.getElementById('visi').textContent=visibility
    document.getElementById('visidiv').style.background = 'yellow'
    document.getElementById('visidiv').style.color = 'black'
  } 
    document.getElementById('time').textContent=time
}

getData()
 setInterval(getData,1000)
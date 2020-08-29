
const dom = {
    input : document.querySelector('.header__input'),
    inputForm : document.getElementById('inputForm'),
    inputButton : document.querySelector('.header__input-button'),
    ip: document.querySelector('.response--ip'), 
    location: document.querySelector('.response--location'), 
    timezone: document.querySelector('.response--timezone'), 
    provider: document.querySelector('.response--ISP')
}

let loc = {
    lat : 0, 
    lon : 0, 
    IP : 0, 
    location: '', 
    timezone: '',
    ISP: ''
}


let data = async function(query = '') {
    
    let result = await fetch(`http://ip-api.com/json/${query}`)
    let data = await result.json();   
    loc.lat = data.lat;
    loc.lon = data.lon;

    dom.ip.textContent = data.query;
    dom.location.textContent = `${data.city}, ${data.country}`; 
    dom.timezone.textContent = data.timezone;
    dom.provider.textContent = data.isp; 
    mymap.setView([loc.lat, loc.lon], 10);
}

data();

dom.inputButton.addEventListener('click', function() {
   
    data(dom.input.value);
});
dom.input.addEventListener('keydown', function(event) {
   
    if (event.keyCode === 13) {
        data(dom.input.value);
    }
}) 


///////////////////////////////////////////////////
////////// Leafletjs /////////////////////////////
/////////////////////////////////////////////////

let mymap = L.map('mapid').setView([40.7128, -74.0060], 10)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZHBheW5lNzEzIiwiYSI6ImNrZWYzaWwwYTA3a3QycHJ6NjZqcTN6YnQifQ.dEhjGpGY7198T3jdeSZ3WA'
}).addTo(mymap);










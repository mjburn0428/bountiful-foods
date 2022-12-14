import { lazyLoader } from "./lazyload.js";
async function getWeather() {
  //Fetch the weather data and awaits the response
  const response = await fetch(weatherURL);
  if (response.ok) {
    //Stores the response as a json object
    const data = await response.json();
    outputWeather(data);
  }
};

async function getForecast() {
  //Fetch the forcast data and await the response
  const response = await fetch(forecastURL);
  if (response.ok) {
    //Stores the forcast response as a json object
    const data = await response.json();
    outputForecast(data);
  }
}

function outputWeather(data) {
  
  const words = data.weather[0].description.split(" ");
  const description = words.map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" ");

  //Fills in the elements with the weather data fetched
  document.getElementById('temperature').textContent = data.main.temp.toFixed(0);
  document.getElementById('description').textContent = description;
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('weatherSprite').style = `background: var(--Gold-Crayola) url(http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png) center no-repeat`;
}

function outputForecast(data) {
  
  let index = 0;
  
  //Grabs today's date
  const date = new Date()
  let day = date.getDate();
  
  //Month names array
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  
  data.list.forEach((forecast) => {
    
    if (index % 8 == 0) {
      
      const div = document.createElement('div');
      const heading = document.createElement('p');
      const icon = document.createElement('img');
      const temp = document.createElement('p');

      
      const words = forecast.weather[0].description.split(" ");
      const description = words.map((word) => { return word[0].toUpperCase() + word.substring(1) }).join(" ");

      heading.innerHTML = `<b>${month[date.getMonth()]} ${day}</b>`;
      temp.innerHTML = `${forecast.main.temp.toFixed(0)}&deg;F`;
      icon.setAttribute('src', 'https://via.placeholder.com/50')
      icon.setAttribute('data-src', `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`);
      icon.setAttribute('alt', description);
      icon.setAttribute('loading', 'lazy');

      div.appendChild(heading);
      div.appendChild(icon);
      div.appendChild(temp);
      document.getElementById('forecasts').appendChild(div);

    //Next day  
      day += 1;
    }
    
    index += 1;
  });

  //Lazy load images
  lazyLoader.loadImgs();
};

function getOrders() {
  //Finds numbers in storage
  if ('numOrders' in localStorage) {
    return `${localStorage.getItem('numOrders')} Drink(s)`
  }
  else {
    return 'Nothing has been ordered today!'
  }
}

//Hamburger Button menu
document.getElementById('navBtn').addEventListener('click', () => {
  document.getElementById('primaryNav').classList.toggle('open');
  document.getElementById('navBtn').classList.toggle('open');
});

//Displays number of drinks ordered from storage
document.getElementById('drinks').innerText = getOrders();

//Copyright year
const date = new Date();
document.getElementById('copyright').textContent = date.getFullYear();

//Last Modified Date
document.getElementById('lastModified').innerText = document.lastModified;

//OpenWeatherAPI data 
const key = '0a3aae8b2c70966916399fb46452de32';
const lat = 33.16;
const lon = -117.33;
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`
//Load Weather Data
getWeather();
getForecast();
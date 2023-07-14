// select our Element to change dom for show information that we get from api call
const form = document.querySelector(".banner-section form");
const input = document.querySelector(".banner-section input");
const message = document.querySelector(".banner-section form .message");
const cardSection = document.querySelector(".cards-section .container-card");

// FOR DIFFERENT  WHETHER ANIMATION ICON

const lightRain = `<div class="cloudy">
<div class="rainy__cloud"></div>
<div class="rainy">
<div class="rainy__rain"></div>
</div>
</div>`;

const clearClearSky = `<div class="clear-sky"></div>`;
const scatteredCloudsBroken = `<div class="broken-clouds">
<div class="cloud-1">
  <div class="shape1"></div>
  <div class="shape2"></div>
  <div class="shape3"></div>
</div>
<div class="cloud-2">
  <div class="shape1"></div>
  <div class="shape2"></div>
  <div class="shape3"></div>
</div>
<div class="cloud-3">
  <div class="shape1"></div>
  <div class="shape2"></div>
  <div class="shape3"></div>
</div>
</div>`;
const rain = `<div class="cloudy">
<div class="thunderstorm__cloud">
  <div class="rainy__rain"></div>
</div>
</div>`;
const overcastClouds = `<div class="few_clouds">
<div class="few_clouds__sun"></div>
<div class="few_clouds__cloud"></div>
</div>`;
const mostlyClear = `<div class="few_clouds">
<div class="few_clouds__sun"></div>
<div class="few_clouds__cloud-small"></div>
</div>`;
const sunny = `<div class="clear_sky"></div>`;
const cloudy = `<div class="cloudy"></div>`;
const mostlyCloudy = `<div class="broken-clouds">
<div class="mostly-cloudy-1">
  <div class="shape1"></div>
  <div class="shape2"></div>
  <div class="shape3"></div>
</div>
<div class="clear-sky"></div>
<div class="mostly-cloudy-2">
  <div class="shape1"></div>
  <div class="shape2"></div>
  <div class="shape3"></div>
</div>
<div class="mostly-cloudy-3">
  <div class="shape1"></div>
  <div class="shape2"></div>
  <div class="shape3"></div>
  </div>
  </div>`;

// ____________________________________________________________________
// what happens when click on submit button
form.addEventListener("submit", (event) => {
  // prevent from load our page
  event.preventDefault();
  let inputValue = input.value;
  const key = "65ae17089f5a0b81780d8d81fed97333";
  const urlLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${key}`;
  let countryN;
  let statN;
  let cityN;
  let latN;
  let lonN;
  /* -------------------------------------------------------------------------- */
  /*                             FIRST FETCH REQUEST                            */
  /* -------------------------------------------------------------------------- */
  const firstFetch = setTimeout(function () {
    fetch(urlLocation)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { country, lat, lon, name, state } = data[0];
        cityN = name;
        countryN = country;
        statN = state;
        latN = Math.round(lat);
        lonN = Math.round(lon);
      });
  }, 1500);
  // send our lat lon location information to our
  // api and get weather information to show in our page
  //   after to minuets that we get data send another request
  /* -------------------------------------------------------------------------- */
  /*                            SECOND FETCH REQUEST                            */
  /* -------------------------------------------------------------------------- */
  const secondFetch = setTimeout(function () {
    console.log(latN, lonN, cityN, countryN, statN);
    const finalLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latN}&lon=${lonN}&appid=${key}`;
    fetch(finalLocation)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const { weather, main } = data;
        console.log(weather[0].description, main.temp);

        // ________________________ IIfe  to show weather animation base on weather ______________________
        let weatherSituation;
        const weatherType = [
          "clear sky",
          "clear",
          "light rain",
          "rain",
          "overcast clouds",
          "mostly clear",
          "cloudy",
          "mostly cloudy",
        ];
        (function getAnimation() {
          if (weather[0].description === "clear sky") {
            weatherSituation = clearClearSky;
          } else if (weather[0].description === "clear") {
            weatherSituation = clearClearSky;
          } else if (weather[0].description === "scattered clouds") {
            weatherSituation = scatteredCloudsBroken;
          } else if (weather[0].description === "broken clouds") {
            weatherSituation = scatteredCloudsBroken;
          } else if (weather[0].description === "light rain") {
            weatherSituation = lightRain;
          } else if (weather[0].description === "rain") {
            weatherSituation = rain;
          } else if (weather[0].description === "moderate rain") {
            weatherSituation = lightRain;
          } else if (weather[0].description === "overcast clouds") {
            weatherSituation = overcastClouds;
          } else if (weather[0].description === "mostly clear") {
            weatherSituation = mostlyClear;
          } else if (weather[0].description === "sunny") {
            weatherSituation = sunny;
          } else if (weather[0].description === "cloudy") {
            weatherSituation = cloudy;
          } else if (weather[0].description === "mostly cloudy") {
            weatherSituation = mostlyCloudy;
          } else {
            return (weatherSituation = weather[0].description);
          }
        })();
        console.log(weatherSituation);
        // _______________________________________________________
        const ul = document.createElement("ul");
        ul.classList.add("cities");

        // put our data inside our dom and add animation class style
        const markup = `
            <li class="card" >${cityN} <sub> ${countryN}</sub></li>
            <li class="card-degree" >${Math.round(
              main.temp - 273
            )} <sup>&#8451</sup></li>
            <li class="card-anim" >${weatherSituation}</li>
            <h2 class="wheater-stat" >${weather[0].description}</h2>`;
        ul.innerHTML = markup;
        cardSection.appendChild(ul);
      });
  }, 2000);
});
//  *todo  START close btn future will be fix later
// ________btn close action for close _______
// setTimeout(function () {
//   let btnClose = document.querySelectorAll(".container-card .btn-close");

//   btnClose.forEach((element) => {
//     console.log(element);
//     element.addEventListener("click", () => {
//       element.parentNode.parentNode.remove();
//       console.log(document.querySelectorAll(".cities").length);
//     });
//   });
// }, 3100);
//  *todo  END close btn future will be fix later

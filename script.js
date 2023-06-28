const weather = {
  apikey: "ff57d5f6c97c5ac1c4d5eba3bee01811",

  fetchWeather: async function (city) {
    // fetching the data from the API so that it can be displayed
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`
      );
      const data = await response.json();
      this.displayWeather(data);
    } catch (error) {
      // checking if thre is any error. if any error occurs it will be displayed
      console.log("Error fetching weather data:", error);
      this.displayError("Something went wrong!");
    }
  },

  displayWeather: function (data) {
    // RETRIEVING DATA
    const { cod } = data;
    const { name, weather, main, wind } = data;
    const locationCity = document.querySelector(".location-city");
    const iconElement = document.querySelector(".icon");
    const tempElement = document.querySelector(".temperature-degree");
    const descElement = document.querySelector(".weather-description");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");
    const weatherElement = document.querySelector(".weather");
    // specifies status code == 200 which shows OK
    if (cod === 200) {
      const { description, icon } = weather[0];
      const { temp, humidity } = main;
      const { speed } = wind;
      // DYNAMICALLY CHANGING THE DATA TO BE DISPLAYED ACCORDING TO THE INPUT FIELD
      locationCity.innerHTML = `Weather in ${name}`;
      // CHANGING ICON ACCORDING TO THE WEATHER OF CITY
      iconElement.style.backgroundImage = `url(https://openweathermap.org/img/wn/${icon}@2x.png)`;
      tempElement.innerHTML = `${temp}°C`;
      descElement.innerHTML = description;
      humidityElement.innerHTML = `Humidity: ${humidity}%`;
      windElement.innerHTML = `Wind: ${speed}Km/hr`;
      weatherElement.classList.remove("loading");
      // CHANGING BACKGROUNG IMAGE ACCORDING TO THE CITY WEATHER
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${description}')`;
      tempElement.style.position = "relative";
      tempElement.style.visibility = "visible";
      humidityElement.style.position = "relative";
      humidityElement.style.visibility = "visible";
      windElement.style.position = "relative";
      windElement.style.visibility = "visible";
    } else if (cod === 400) {
      this.displayError("City not found");
    } else {
      this.displayError("Something went wrong!");
    }
  },

  displayError: function (message) {
    const locationCity = document.querySelector(".location-city");
    const tempElement = document.querySelector(".temperature-degree");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");
    const weatherElement = document.querySelector(".weather");
    locationCity.innerHTML = message;
    // ADDING STYLES (CSS)
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    humidityElement.style.position = "absolute";
    humidityElement.style.visibility = "hidden";
    windElement.style.position = "absolute";
    windElement.style.visibility = "hidden";
    weatherElement.classList.remove("loading");
  },

  search: function () {
    // TAKING THE VALUE OF CITY ENTERED BY THE USER
    const city = document.querySelector(".search-bar").value;
    // CHECKING IF CITY DATA IS PRESENT IN API
    if (city) {
      const weatherElement = document.querySelector(".weather");
      weatherElement.classList.add("loading");
      this.fetchWeather(city);
    } else {
      this.displayError("Please enter a city");
    }
  },
};
// ADDING EVENT LISTENER TO THE SEARCH BUTTON
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
// KEYBOARD ENTER BUTTON TO TRIGGER SEARCH BUTTON
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });
// DEFAULT WEATHER WILL BE DISPLAYED OF NOIDA
weather.fetchWeather(" Noida");

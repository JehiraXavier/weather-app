/* Fetching Data from API - OpenWeatherMap */
let weather = {
  apiKey: "7f1a6f70c3b5e4d69651f682d022ce2d", //API from personal account. Use different API
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Invalid location");
          throw new Error("Invalid location");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like } = data.main;
    const { speed } = data.wind;
    const { sunrise, sunset } = data.sys;

    var sunrise_time = new Date(sunrise * 1000);
    var sunset_time = new Date(sunset * 1000);

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = temp + "°C";
    document.querySelector(".feels_like_temperature").innerText =
      "Feels like: " + feels_like + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";

    document.querySelector(".sunrise").innerText =
      "Sunrise: " + sunrise_time.toLocaleString();
    document.querySelector(".sunset").innerText =
      "Sunset: " + sunset_time.toLocaleString();

    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')"; //Background changes accoridng to the city

    console.log(data);
    console.log("City: " + name);
    console.log("Icon: " + icon);
    console.log("Weather: " + description);
    console.log("Temperature: " + temp);
    console.log("Humidity: " + humidity);
    console.log("Speed: " + speed);
    console.log("Sunrise: " + sunrise);
    console.log("Sunset: " + sunset);

    console.log(myDate.toLocaleString());
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document
  .querySelector(".search-container button")
  .addEventListener("click", function () {
    weather.search();
  });

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Colombo"); //Loading city

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

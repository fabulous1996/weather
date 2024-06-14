const locationInput = document.getElementById("location-input");
const searchButton = document.getElementById("search-button");
const currentLocation = document.querySelector(".location-icon");
const locationElement = document.getElementById("location");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

searchButton.addEventListener("click", function () {
  const locationValue = locationInput.value;
  if (locationValue) {
    fetchWeatherData(locationValue);
    locationInput.value = "";
    locationInput.blur();
  } else {
    alert("Please enter a location");
  }
});

currentLocation.addEventListener("click", function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetchWeatherDataByCoordinates(latitude, longitude);
      },
      function (error) {
        console.error("Error getting location:", error);
        alert("An error occurred while retrieving your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function fetchWeatherData(locationValue) {
  const apiKey = "API KEY"; //Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        updateWeatherInfo(data);
      } else {
        alert("Location not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("An error occurred while fetching the weather data.");
    });
}

function fetchWeatherDataByCoordinates(lat, lon) {
  const apiKey = "API KEY"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        updateWeatherInfo(data);
      } else {
        alert("Location not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("An error occurred while fetching the weather data.");
    });
}

function updateWeatherInfo(data) {
  locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  description.textContent = `Description: ${data.weather[0].description}`;
}

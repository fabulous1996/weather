const locationInput = document.getElementById("location-input");
const searchButton = document.getElementById("search-button");
const locationElement = document.getElementById("location");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

searchButton.addEventListener("click", function () {
  const locationValue = locationInput.value;
  if (locationValue) {
    fetchWeatherData(locationValue);
  } else {
    alert("Please enter a location");
  }
});

function fetchWeatherData(locationValue) {
  const apiKey = "b0c200c48efc3f42803d53c26c58721c";
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

function updateWeatherInfo(data) {
  locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  description.textContent = `Description: ${data.weather[0].description}`;
}

const getWeatherButton = document.getElementById('getWeatherButton');
const citiesInput = document.getElementById('citiesInput');
const weatherResults = document.getElementById('weatherResults');
const APIurl = "https://weather-by-city.onrender.com/getWeather"

getWeatherButton.addEventListener('click', async () => {
    const cities = citiesInput.value.split(',').map(city => city.trim());
    if (cities.length === 0) {
        weatherResults.textContent = 'Please enter city names.';
        return;
    }
    const response = await fetch(APIurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cities })
        }
    );

    const data = await response.json();
    if (response.ok) {
        displayWeather(data.weather);
    } 
    else {
        weatherResults.textContent = 'An error occurred.';
    }
});

function displayWeather(weatherData) {
    let resultHtml = '<h2>Weather Results:</h2><ul>';

    for (const city in weatherData) {
        resultHtml += `<li>${city.toUpperCase()}: ${weatherData[city]}</li>`;
    }

    resultHtml += '</ul>';
    weatherResults.innerHTML = resultHtml;
}

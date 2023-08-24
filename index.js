const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


async function getWeatherData(cities) {
  const apiKey = process.env.APIKEY;
  const weatherData = {};

  for (const city of cities) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    const temperature = response.data.main.temp;
    weatherData[city] = `${temperature}°C`;
  }

  return weatherData;
}

app.post('/getWeather', async (req, res) => {
    try {
      const { cities } = req.body;
      const weatherData = await getWeatherData(cities);
      res.json({ weather: weatherData });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

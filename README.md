# Weather App

Check the current weather on any city on the planet. Switch between metric and imperial units.

Features

1. Predefined city configuration (no search required).
2. Current local time and date display.
3. Accurate temperature, humidity, and "feels like" values.
4. Wind speed with direction converted into cardinal points (e.g., SSE, WSW).
5. Display of sunrise and sunset times.
6. Seamless switch between metric (°C, m/s) and imperial (°F, mph) systems.
7. Automatic hourly refresh of weather data.
8. Error handling and loading state management.

## Installation

1. `git clone https://github.com/kmerren/weather-app.git`

2. `cd weather-app`

3. `npm install`

4. Log in to Open-Meteo API (or relevant API service) to fetch weather data.

5. `cp .env.example .env.local`

6. Update your API credentials in the .env.local file:

   OPENWEATHER_API _KEY=your_api_key_here

7. `npm run dev`

## Contributions

Any feature requests and pull requests are welcome!

## License

The project is under [MIT license](https://choosealicense.com/licenses/mit/).

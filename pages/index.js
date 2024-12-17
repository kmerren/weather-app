import { useState, useEffect } from "react";
import { DEFAULT_LOCATION } from "../src/config";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { Search } from "../components/Search";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [unitSystem, setUnitSystem] = useState("metric");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${DEFAULT_LOCATION.latitude}&longitude=${DEFAULT_LOCATION.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,winddirection_10m,weathercode&daily=sunrise,sunset&timezone=auto`
        );
        const data = await response.json();
        
        // Transform Open Meteo data to match your app's structure
        const transformedData = {
          name: DEFAULT_LOCATION.city,
          sys: { 
            country: DEFAULT_LOCATION.country,
            sunrise: new Date(data.daily.sunrise[0]).getTime() / 1000,  // Convert to Unix timestamp
            sunset: new Date(data.daily.sunset[0]).getTime() / 1000     // Convert to Unix timestamp
          },
          weather: [{
            description: getWeatherDescription(data.current_weather.weathercode),
            icon: getWeatherIcon(data.current_weather.weathercode)
          }],
          main: {
            temp: data.current_weather.temperature,
            humidity: data.hourly.relativehumidity_2m[0]
          },
          wind: {
            speed: data.current_weather.windspeed,
            deg: data.current_weather.winddirection
          },
          dt: new Date().getTime() / 1000,  // Current timestamp in seconds
          timezone: 0  // Or get timezone offset from the browser
        };
        
        setWeatherData(transformedData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Initial fetch
    fetchWeatherData();

    // Set up hourly refresh
    const refreshInterval = setInterval(fetchWeatherData, 3600000);
    return () => clearInterval(refreshInterval);
  }, []);

  const changeSystem = () => setUnitSystem(prev => prev === "metric" ? "imperial" : "metric");

  // Helper functions for weather codes
  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      // Add more weather codes as needed
    };
    return weatherCodes[code] || "Unknown";
  };

  const getWeatherIcon = (code) => {
    // Map Open Meteo weather codes to your icon system
    const iconMap = {
      0: "01d", // Clear sky
      1: "02d", // Mainly clear
      2: "03d", // Partly cloudy
      3: "04d", // Overcast
      // Add more mappings as needed
    };
    return iconMap[code] || "unknown";
  };

  return weatherData ? (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.name}
        country={weatherData.sys.country}
        description={weatherData.weather[0].description}
        iconName={weatherData.weather[0].icon}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;

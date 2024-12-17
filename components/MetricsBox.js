import React from 'react';
import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  // Add debug logging
  React.useEffect(() => {
    if (weatherData?.wind) {
      console.log('Wind data:', {
        speed: weatherData.wind.speed,
        direction: weatherData.wind.deg,
        rawWind: weatherData.wind
      });
    }
  }, [weatherData]);

  if (!weatherData) {
    return <div className={styles.wrapper}>Loading...</div>;
  }

  // Get wind direction or default message
  const windDirection = weatherData.wind?.deg !== undefined 
    ? degToCompass(weatherData.wind.deg)
    : "No data";

  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={weatherData.main?.humidity ?? "N/A"}
        unit={"%"}
      />
      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={weatherData.wind?.speed ? getWindSpeed(unitSystem, weatherData.wind.speed) : "N/A"}
        unit={unitSystem === "metric" ? "m/s" : "mph"}
      />
      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={"Not available"}
      />
      <MetricsCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, weatherData.visibility)}
        unit={unitSystem === "metric" ? "km" : "mi"}
      />
      <MetricsCard
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        metric={"Not available"}
      />
      <MetricsCard
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        metric={"Not available"}
      />
    </div>
  );
};

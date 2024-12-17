import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) => {
  // If visibility is undefined, use a default value of 10000 meters (10km)
  const defaultVisibility = 10000;
  const visibility = visibilityInMeters ?? defaultVisibility;
  
  if (unitSystem === "metric") {
    return (visibility / 1000).toFixed(1);
  } else {
    return kmToMiles(visibility / 1000).toFixed(1);
  }
};

export const getTime = (unitSystem, timestamp, timezone) => {
  if (!timestamp) return "N/A";
  
  try {
    return unitSystem == "metric"
      ? unixToLocalTime(timestamp, timezone)
      : timeTo12HourFormat(unixToLocalTime(timestamp, timezone));
  } catch (error) {
    console.error('Error converting time:', error);
    return "N/A";
  }
};

export const getAMPM = (unitSystem, timestamp, timezone) => {
  if (!timestamp || unitSystem !== "imperial") return "";
  
  try {
    return unixToLocalTime(timestamp, timezone).split(":")[0] >= 12 ? "PM" : "AM";
  } catch (error) {
    return "";
  }
};

export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[
    new Date((weatherData.dt + weatherData.timezone) * 1000).getUTCDay()
  ];
};

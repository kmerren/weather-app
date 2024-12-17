export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => {
  if (!km && km !== 0) return 0;
  return Number(km / 1.609);
};

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours);
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert to 12-hour format
  return `${hours}:${minutes}`;
};

export const degToCompass = (deg) => {
  if (deg === undefined || deg === null) {
    return "No data";
  }

  // Ensure deg is a number and normalize it
  const normalizedDeg = ((Number(deg) % 360) + 360) % 360;
  
  const directions = [
    "N", "NNE", "NE", "ENE", 
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", 
    "W", "WNW", "NW", "NNW"
  ];
  
  const val = Math.round(normalizedDeg / 22.5);
  return directions[val % 16];
};

export const unixToLocalTime = (unixSeconds, timezone) => {
  // Create date directly from unix timestamp and timezone
  const localTime = new Date((unixSeconds + timezone) * 1000);
  
  const hours = localTime.getHours().toString().padStart(2, '0');
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

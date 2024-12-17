export const WeatherDisplay = ({ weatherData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Paris, {weatherData.sys.country}</h1>
        <p>{weatherData.weather[0].description}</p>
      </div>
      {/* ... rest of the component ... */}
    </div>
  );
}; 
import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  description,
  iconName,
  unitSystem,
  weatherData,
}) => {
  console.log('MainCard weatherData:', {
    weatherData,
    feelsLike: weatherData?.main?.feels_like,
    main: weatherData?.main
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city}, {country}
      </h1>
      <p className={styles.description}>{description}</p>
      <Image
        width={300}
        height={300}
        src={`/icons/${iconName}.svg`}
        alt="weatherIcon"
      />
      <h1 className={styles.temperature}>
        {weatherData?.main?.temp && (
          <>
            {unitSystem === "metric"
              ? Math.round(weatherData.main.temp)
              : Math.round(ctoF(weatherData.main.temp))}
            °{unitSystem === "metric" ? "C" : "F"}
          </>
        )}
      </h1>
      <p>
        Feels like{" "}
        {weatherData?.main?.temp ? (
          <>
            {unitSystem === "metric"
              ? Math.round(weatherData.main.temp)
              : Math.round(ctoF(weatherData.main.temp))}
            °{unitSystem === "metric" ? "C" : "F"}
          </>
        ) : (
          "N/A"
        )}
      </p>
    </div>
  );
};

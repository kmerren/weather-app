export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=paris,FR&units=metric&appid=${process.env.OPENWEATHER_API_KEY}&mode=json&wind=true`
    );
    
    const data = await response.json();
    
    console.log('Wind data received:', data.wind);
    
    if (!data.wind?.deg) {
      data.wind = {
        ...data.wind,
        deg: 0  // Default to North
      };
    }
    
    res.status(200).json(data);
    
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}

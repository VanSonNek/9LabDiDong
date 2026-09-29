export interface WeatherData {
  cityName: string;
  country: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  icon: string;
}

export function getWeatherDescription(code: number): { description: string; icon: string } {
  switch (code) {
    case 0:
      return { description: 'Trời quang đãng (Clear sky)', icon: '☀️' };
    case 1:
      return { description: 'Hầu như không mây (Mainly clear)', icon: '🌤️' };
    case 2:
      return { description: 'Có mây rải rác (Partly cloudy)', icon: '⛅' };
    case 3:
      return { description: 'Trời nhiều mây (Overcast)', icon: '☁️' };
    case 45:
    case 48:
      return { description: 'Sương mù (Foggy)', icon: '🌫️' };
    case 51:
    case 53:
    case 55:
      return { description: 'Mưa phùn (Drizzle)', icon: '🌦️' };
    case 56:
    case 57:
      return { description: 'Mưa phùn đóng băng (Freezing Drizzle)', icon: '🌧️' };
    case 61:
    case 63:
    case 65:
      return { description: 'Mưa rào (Rain)', icon: '🌧️' };
    case 66:
    case 67:
      return { description: 'Mưa lạnh giá (Freezing Rain)', icon: '🌧️' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { description: 'Tuyết rơi (Snow)', icon: '❄️' };
    case 80:
    case 81:
    case 82:
      return { description: 'Mưa rào nặng hạt (Rain showers)', icon: '🌧️' };
    case 85:
    case 86:
      return { description: 'Mưa tuyết (Snow showers)', icon: '🌨️' };
    case 95:
      return { description: 'Dông sét (Thunderstorm)', icon: '⛈️' };
    case 96:
    case 99:
      return { description: 'Dông sét kèm mưa đá (Thunderstorm with hail)', icon: '⛈️' };
    default:
      return { description: 'Thời tiết khác (Unknown weather)', icon: '🌈' };
  }
}

export async function fetchCityWeather(cityName: string): Promise<WeatherData> {
  const trimmed = cityName.trim();
  if (!trimmed) {
    throw new Error('Vui lòng nhập tên thành phố.');
  }

  // 1. Geocoding API
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    trimmed
  )}&count=1&language=en&format=json`;

  const geoRes = await fetch(geoUrl);
  if (!geoRes.ok) {
    throw new Error('Không thể kết nối đến dịch vụ định vị (Geocoding API).');
  }

  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`Không tìm thấy thành phố "${trimmed}".`);
  }

  const location = geoData.results[0];
  const { latitude, longitude, name, country } = location;

  // 2. Forecast API
  const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;

  const forecastRes = await fetch(forecastUrl);
  if (!forecastRes.ok) {
    throw new Error('Không thể tải dữ liệu thời tiết (Forecast API).');
  }

  const forecastData = await forecastRes.json();
  if (!forecastData.current) {
    throw new Error('Dữ liệu thời tiết không hợp lệ.');
  }

  const current = forecastData.current;
  const weatherInfo = getWeatherDescription(current.weather_code);

  return {
    cityName: name,
    country: country || '',
    temperature: Math.round(current.temperature_2m * 10) / 10,
    apparentTemperature: Math.round(current.apparent_temperature * 10) / 10,
    humidity: Math.round(current.relative_humidity_2m),
    windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
    weatherCode: current.weather_code,
    description: weatherInfo.description,
    icon: weatherInfo.icon,
  };
}

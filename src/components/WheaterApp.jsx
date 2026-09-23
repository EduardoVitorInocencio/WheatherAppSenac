import sunny from '../assets/images/sunny.png'
import { useState } from 'react'

// Utilitários
import { getWeatherInfo } from '../utils/weatherCode'


const WheatherApp = () => {
  // GERENCIMENTO E CONTROLE DE DADOS E AÇOES
  const [data, setData] = useState(null)
  const [location, setLocation] = useState('')

  const getCoordinates = async(cityName) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=pt&format=json`

    const response = await fetch(url)
    const data = await response.json()

    if (!data.results || data.results.length === 0){
      throw new Error('Cidade não encontrada')
    }

    const city = data.results[0]

    return{
      latitude: city.latitude,
      longitude: city.longitude,
      name: city.name,
      country: city.country
    }
  }

  const handleInputChanges = (e) => {
    setLocation(e.target.value)
    console.log(location)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(location)
    }
  }

  const search = async (cityName) => {
    try {
      // 1. Buscar as coordenadas
      const coordinates = await getCoordinates(cityName)
  
      // 2. Pegar latitude e longitude
      const { latitude, longitude } = coordinates
  
      // 3. Buscar o clima
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
  
      const response = await fetch(url)
      const weatherData = await response.json()
  
      // 4. Traduzir o weather code
      const weatherInfo = getWeatherInfo(
        weatherData.current.weather_code
      )
  
      console.log('Clima:')
      console.log(weatherData.current)
      console.log('Informações:', weatherInfo)
  
      // 5. Salvar no estado
      setData({
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        weatherCode: weatherData.current.weather_code,
  
        city: coordinates.name,
        country: coordinates.country,
  
        weatherType: weatherInfo.type,
        weatherDescription: weatherInfo.description
      })
  
    } catch (error) {
      console.log(error.message)
    }
  }

  // ELEMENTOS QUE SERÃO RENDERIZADOS
  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            
            <div className="location">
              {data ? data.city : "Search a city"}
            </div>

          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChanges}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="weather">
          <img src={sunny} alt="Clear sky" />

          <div className="weather-type">
            {data ? data.weatherDescription : '--'}
          </div>

          <div className="temp">
            {data ? `${Math.round(data.temperature)}°` : '--'}
          </div>
        </div>


        <div className="weather-date">
          <p>Sat, 15 Ago</p>
        </div>

        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">
              {data ? `${data.humidity}%` : '--'}
            </div>
          </div>

          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">
              {data ? `${data.windSpeed} km/h` : '--'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WheatherApp
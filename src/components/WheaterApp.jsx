import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'
import loadingGif from '../assets/images/loading.gif'

import { useState } from 'react'

// Utilitários
import { getWeatherInfo } from '../utils/weatherCode'

const WheatherApp = () => {
  // GERENCIAMENTO E CONTROLE DE DADOS E AÇÕES
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [location, setLocation] = useState('')

  // Imagens relacionadas aos tipos de clima
  const weatherImages = {
    sunny,
    cloudy,
    rainy,
    snowy
  }

  // Buscar coordenadas da cidade
  const getCoordinates = async (cityName) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityName
    )}&count=1&language=pt&format=json`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Erro ao buscar a cidade')
    }

    const result = await response.json()

    if (!result.results || result.results.length === 0) {
      throw new Error('Cidade não encontrada')
    }

    const city = result.results[0]

    return {
      latitude: city.latitude,
      longitude: city.longitude,
      name: city.name,
      country: city.country
    }
  }

  // Alterar o valor do input
  const handleInputChanges = (e) => {
    setLocation(e.target.value)
  }

  // Buscar ao pressionar Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(location)
    }
  }

  // Buscar clima
  const search = async (cityName) => {
    const normalizedCity = cityName.trim()

    if (!normalizedCity) {
      return
    }

    try {
      setIsLoading(true)

      // 1. Buscar coordenadas
      const coordinates = await getCoordinates(normalizedCity)

      // 2. Pegar latitude e longitude
      const { latitude, longitude } = coordinates

      // 3. Buscar clima
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Erro ao buscar os dados do clima')
      }

      const weatherData = await response.json()

      // 4. Traduzir o weather code
      const weatherInfo = getWeatherInfo(
        weatherData.current.weather_code
      )

      // 5. Escolher a imagem correspondente
      const weatherImage = weatherImages[weatherInfo.type]

      console.log('Clima:', weatherData.current)
      console.log('Informações:', weatherInfo)
      console.log('Imagem:', weatherImage)

      // 6. Salvar os dados no estado
      setData({
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
        weatherCode: weatherData.current.weather_code,

        city: coordinates.name,
        country: coordinates.country,

        weatherType: weatherInfo.type,
        weatherDescription: weatherInfo.description,

        weatherImage: weatherImage
      })

    } catch (error) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
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
              {data ? data.city : 'Search a city'}
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

        {isLoading ? (
          <div className="loading">
            <img src={loadingGif} alt="Loading weather..." />
          </div>
        ) : (
          <>
            <div className="weather">

              <img
                src={data ? data.weatherImage : sunny}
                alt={
                  data
                    ? data.weatherDescription
                    : 'Weather'
                }
              />

              <div className="weather-type">
                {data
                  ? data.weatherDescription
                  : '--'}
              </div>

              <div className="temp">
                {data
                  ? `${Math.round(data.temperature)}°`
                  : '--'}
              </div>

            </div>

            <div className="weather-date">
              <p>Sat, 15 Ago</p>
            </div>

            <div className="weather-data">

              <div className="humidity">

                <div className="data-name">
                  Humidity
                </div>

                <i className="fa-solid fa-droplet"></i>

                <div className="data">
                  {data
                    ? `${data.humidity}%`
                    : '--'}
                </div>

              </div>

              <div className="wind">

                <div className="data-name">
                  Wind
                </div>

                <i className="fa-solid fa-wind"></i>

                <div className="data">
                  {data
                    ? `${data.windSpeed} km/h`
                    : '--'}
                </div>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default WheatherApp

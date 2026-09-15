import sunny from '../assets/images/sunny.png'

const WheatherApp = () => {
  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">London</div>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        <div className="weather">
          <img src={sunny} alt="Clear sky" />
          <div className="weather-type">Clear</div>
          <div className="temp">28°</div>
        </div>

        <div className="weather-date">
          <p>Sat, 15 Ago</p>
        </div>

        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">35%</div>
          </div>

          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">3 km/h</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WheatherApp
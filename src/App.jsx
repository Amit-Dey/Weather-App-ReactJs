import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios'

function App() {

  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(true)

  const [query, setQuery] = useState('')



  const handelRequest = async () => {
    const options = {
      method: 'GET',
      url: import.meta.env.VITE_WEATHER_API_URL,
      params: { q: query },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_WEATHER_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_WEATHER_API_HOST
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setWeather(response.data)
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  const getCurrentPosition = () => navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    setQuery(`${latitude},${longitude}`)
  })

  useEffect(() => {
    getCurrentPosition()
  }, [])

  useEffect(() => {
    if (query) {
      handelRequest()
    }
  }, [query])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Today&apos;s Weather</h1>
      </header>
      <main className='Main'>
        <div className="weather">
          {loading ? <p className='Loading'>Loading...</p> : (
            <div className='wather-card' >
              <h2>{weather.location.name}, {weather.location.country}</h2>
              <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
              <p className='condition'>{weather.current.condition.text}</p>
              <p className='temp' >{weather.current.temp_c}°C</p>
              <p className='feels-like'>Feels like {weather.current.feelslike_c}°C</p>
              {/* Description */}
              <div className='description'>
                <p>Wind: {weather.current.wind_kph} km/h</p>
                <p>Humidity: {weather.current.humidity}%</p>
                <p>Pressure: {weather.current.pressure_mb} mb</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App

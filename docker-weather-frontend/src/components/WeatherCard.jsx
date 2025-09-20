import React from 'react'

function WeatherCard({ data }) {
  if (data.cod !== 200) {
    return <p>City not found.</p>
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', display: 'inline-block' }}>
      <h2>{data.name}, {data.sys.country}</h2>
      <p>Temperature: {data.main.temp}°C</p>
      <p>Weather: {data.weather[0].description}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind: {data.wind.speed} m/s</p>
    </div>
  )
}

export default WeatherCard

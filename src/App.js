import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=55ecfdd91ea4fb991fcc80b5cd70ee29`

  // data
  // https://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=55ecfdd91ea4fb991fcc80b5cd70ee29
  
  const SearchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        console.log(response.data.weather[0].main);
      })
      setLocation('');
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={SearchLocation}
          placeholder='Enter Location'
          type='text' />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name} {data.sys ? data.sys.country : null}</p>
          </div>
          <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p className='bold'>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && 
        <div className='bottom'>
        <div className='feel'>
          {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
          <p>Feels Like</p>
        </div>
        <div className='humidity'>
          <p>
          {data.main ? <p className='bold'>{data.main.humidity.toFixed()}%</p> : null}
          </p>
          <p>Humidity</p>
        </div>
        <div className='wind'>
          {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
          <p>Wind Speed</p>
         
        </div>
        </div>
        }
      </div>
    </div>
  );
}

export default App;

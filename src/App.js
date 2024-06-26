import React ,{ useState } from "react";
import axios from "axios";
import './index.css'
import { eventWrapper } from "@testing-library/user-event/dist/utils";

function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [celsiusTemp, setCelsiusTemp] = useState(null)
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=adf6cc5cf894b87f5e3ceb68426fc93d` 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=adf6cc5cf894b87f5e3ceb68426fc93d`;



  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        setCelsiusTemp((response.data.main.temp - 32) * 5/9)
        console.log(response.data)
      })
    }
  }




  //const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=adf6cc5cf894b87f5e3ceb68426fc93d`

  return (
    <div className="App">
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
        type="text" />
      </div>

      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °F</h1>:null}
          </div>
          <div className='temp-celsius'>
            {celsiusTemp ? <h1>{celsiusTemp.toFixed()} °C</h1>:null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p>:null}
          </div>
        </div>
        {data.name != undefined &&
        <div className='bottom'>
          <div className='feels'>
            {data.main ?  <p className="bold">{data.main.feels_like.toFixed()}</p>: null}            <p>Feels Like</p>
          </div>
          <div className='humidity'>
            {data.main ? <p className="bold">{data.main.humidity.toFixed()}</p>:null}            <p>Humidity</p>
          </div>
          <div className='wind'>
            {data.wind ? <p className="bold">{data.wind.speed.toFixed()}</p>:null}
            <p>Wind Speed</p>
          </div>
        </div>} 
      </div>
    </div>
  );
}

export default App;

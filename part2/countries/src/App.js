import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react'
import getWeather from "./services/apixu";


const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const url = new URL("https://api.openweathermap.org/data/2.5/weather?q=" + capital + "&appid=" + api_key)

  const getWeather = async capital => {
    const response = await axios.get(url);
    console.log(response.data)
    return response.data;
  };

  useEffect(() => {
    getWeather(capital).then(e => setWeather(e))
  }, [])

  if (weather.length === 0) {
    return (
      <p>loading...</p>
    )
  } else {
    const iconURL = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>Temperature: {weather.main.temp} Celsius</p>
        <img src={iconURL}/>
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

const Country = ({ name, capital, area, population, languages, flagUrl, lat, lon }) => {
  return (
    <div>
      <h1>{name}</h1>
      <div>
        capital: {capital}<br></br>
        area: {area} <br></br>
        population: {population}<br></br>
      </div>
      <h3>languages</h3>
      <ul>
        {languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={flagUrl} alt="No flag found" height="250" width="350" />
      <Weather capital={capital} />
    </div>
  );
};

const Countries = (props) => {
  const [buttonCountry, setButtonCountry] = useState()

  const handleButtonCountry = (e) => {
    const targetCont = props.countries.filter(cont => cont.name.includes(e.target.value))
    setButtonCountry(targetCont[0])
  }

  if (buttonCountry !== undefined) {
    return (
      <div>
        <Country
          key={buttonCountry.name}
          name={buttonCountry.name}
          capital={buttonCountry.capital}
          area={buttonCountry.area}
          population={buttonCountry.population}
          languages={buttonCountry.languages}
          flagUrl={buttonCountry.flag}
        />
      </div>
    )
  }

  let copy = props.countries.filter(e => e.name.toLowerCase().includes(props.newSearch.toLowerCase()))

  if (copy.length === 0) {
    return (
      <p>flaute</p>
    )
  }

  if (copy.length === 1) {
    return (
      <div>
        {props.countries.filter(e => e.name.toLowerCase().includes(props.newSearch.toLowerCase()))
          .map(country => <Country
            key={country.name}
            name={country.name}
            capital={country.capital}
            area={country.area}
            population={country.population}
            languages={country.languages}
            flagUrl={country.flag}
          />)
        }
      </div>
    )
  }

  if (copy.length > 10) {
    return (
      <p>To many matches, specify filter</p>
    )
  }

  if (props.newSearch.length !== 0) {
    return (
      <div>
        {copy.map(e => {
          return <div key={e.name}> {e.name}
            <button onClick={handleButtonCountry} value={e.name}>show</button></div>
        })}
      </div>
    )
  }

  return (
    <div>
      flaute
    </div>
  )
}

const Filter = (props) => {
  return (
    <form>
      filter: <input value={props.newSearch} onChange={props.onSearchChange} />
    </form>
  )
}

const App = (props) => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState([])

  // setCountries

  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        // console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleOnSearchChange = (e) => {
    setNewSearch(e.target.value)
  }

  return (
    <div>
      <Filter newSearch={newSearch} onSearchChange={handleOnSearchChange} />
      <Countries countries={countries} newSearch={newSearch} />
    </div>
  )
}

export default App;

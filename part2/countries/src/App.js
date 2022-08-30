import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react'


const Weather = ({lat, lon}) => {
  const [weather, setWeather] = useState()
  // const lat = props.capital.latlng[0]
  // const lon = props.capital.latlng[1]
  const key = "1fc957a15b158eb2e6301c2484357b14"
  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=ee4fb7d1a1b956e57ad6b8268e247c41')
      .then(response => {
        setWeather(response.data)
        console.log('hi')
      })
  }, [weather, setWeather])
  //     axios
  //     .get('https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${key}'))
  //     .then(response => {
  //     setWeather(response.data)
  //   })
  // })

  // return (
  //   <div>
  //     <p>temperature {weather} Celcius</p> 
  //   </div> 
  // )
}

const Country = ({ name, capital, area, population, languages, flagUrl, lat, lon}) => {
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
      <Weather lat={name} lon={lon} />
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
          lat={buttonCountry.latlng[0]}
          lon={buttonCountry.latlng[1]}
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

  if (copy.length > 100) {
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

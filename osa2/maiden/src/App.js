import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, change}) => {
  return (
    <div>
      filter the search: <input
          value={value}
          onChange={change}
          />
    </div>
  )
}

const ButtonCountry = ({country, thisCountry}) => {
  return (
    <div>
        <b>{country.name}</b> <button type="submit" onClick={() => { thisCountry(country.name) }}>This one!</button>
    </div>
  )
}

const CountryList = ({whatToShow, thisCountry}) => {
  console.log(whatToShow)
  if(whatToShow.length > 10){
    return (
      <div>Too many results, please specify search term</div>
    )
  }else if (whatToShow.length > 1 && whatToShow.length <= 10){
    return(
      <div>{whatToShow.map(country =>  
      <ButtonCountry key={country.name} country={country} thisCountry={thisCountry}/>
      )}</div>
    )
  }else if (whatToShow.length === 1){
    return(
      <div>
        <h1>{whatToShow[0].name}</h1>
        <p>Capital: {whatToShow[0].capital}</p>
        <p>Population: {whatToShow[0].population}</p>
        <p>Region: {whatToShow[0].region}</p>
        <br></br>
        <p>Languages:</p>
        <div>{whatToShow[0].languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</div>
        <br></br>
        <p>Flag:</p>
        <img src={whatToShow[0].flag} 
          width="300" height="175"/>
      </div>
    )
  }else{
    return(
      <p>homo</p>
    )
  }
  
}

function App() {
  const [countries, setCountries] = useState([]) 
  const [newSearch, setNewSearch] = useState('')

  const hook = () => {
    //console.log('effect')
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleChangeSearch = (event) => {
    //console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const ThisCountry = (name) => {
    setNewSearch(name)
  }

  const whatToShow = countries.filter(x => x.name.toLocaleLowerCase('no-no').includes(newSearch.toLocaleLowerCase('no-no')) == true)

  return (
    <div className="App">
      <h1>Countries of the World</h1>

      <div>
      <Filter 
        value={newSearch}
        change={handleChangeSearch}
      />
      <CountryList 
        whatToShow={whatToShow}
        thisCountry={ThisCountry}
      />
      </div>

      
    </div>
  );
}

export default App;

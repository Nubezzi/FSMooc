import { useState, useEffect } from 'react'
import axios from 'axios'
import storage from './services/storage'

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

const Adder = ({addPerson, newName, handleChangeName, newNumber, handleChangeNum}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleChangeName}
          />
      </div>
      <div>
        number: <input 
          value={newNumber}
          onChange={handleChangeNum}
        />
      </div>
          <button type="submit">add</button>
    </form>
  )
}

const ContactBook = ({ whatToShow }) => {
  return (
    <ul>
        {whatToShow.map(person =>
          <Person key={person.name} person={person}/>
        )}
    </ul>
  )
}

const Person = ({ person }) => {
  return (
    <p>{person.name}, {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    /*{ name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }*/
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  /*const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }*/
  
  useEffect(() => {
    storage
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  //console.log('render', persons.length, 'storage')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if(persons.filter(per => per.name === newName).length > 0){
      alert(`${newName} is already on the contactbook`)
    }else {
      storage
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewName('')
      })
    }
  }

  

  const handleChangeName = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleChangeNum = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleChangeSearch = (event) => {
    //console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const whatToShow = persons.filter(x => x.name.toLocaleLowerCase('no-no').includes(newSearch) == true)

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={newSearch}
        change={handleChangeSearch}
      />
      <h2>Add numbers</h2>
      <Adder
        addPerson={addPerson}
        newName={newName}
        handleChangeName= {handleChangeName}
        newNumber= {newNumber}
        handleChangeNum={handleChangeNum}
      />
      
      <h2>Numbers</h2>
      <ul>
        <ContactBook whatToShow={whatToShow}/>
      </ul>
    </div>
  )

}

export default App
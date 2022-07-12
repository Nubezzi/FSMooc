import { useState, useEffect } from 'react'
import axios from 'axios'
import storage from './services/storage'
import './index.css'

const Notification = ({ message, state }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={state}>
      {message}
    </div>
  )
}

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

const ContactBook = ({ whatToShow, deleter }) => {
  return (
    <ul>
        {whatToShow.map(person =>
          <Person key={person.name} person={person} deleter={deleter}/> 
        )}
    </ul>
  )
}


const Person = ({ person, deleter }) => {
  return (
    <div>
      <b>{person.name}, {person.number}</b> <button type="submit" onClick={() => { deleter(person) }}>delete contact</button>
    </div>
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
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorMessageState, setErrorMessageState] = useState("success")
  
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
      if (window.confirm(`${newName} is already in your contacts. Do you want to update their number?`)) {
        updatePerson(newName, personObject);
        setNewNumber('')
        setNewName('')
      }
    }else {
      storage
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewName('')
        setErrorMessage(
          `Added ${newName} successfully!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const deleter = (person) => {
    if (window.confirm(`Do you really want to remove ${person.name}?`)) {
      deletePerson(person.id);
    }
  }

  const updatePerson = (name, personObject) => {
    const current = persons.find(x => x.name === name)
    console.log("updated id: ", current.id)
    storage
      .update(current.id, personObject)
        .then(returnedValue => {
        setPersons(persons.filter(x => x != current).concat(returnedValue))
        console.log(returnedValue)
        setErrorMessage(
          `Updated ${name} successfully!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessageState("error")
        setErrorMessage(
          `Seems that ${name} is already deleted on another instance of the service.`
        )
        setTimeout(() => {
          setErrorMessage(null)
          setErrorMessageState("success")
        }, 5000)
        setPersons(persons.filter(x => x.name != name))
      })
      
  }

  const deletePerson = (id) => {
    console.log("deleted id: ", id)
    const thisper = persons.find(x => x.id === id)
    const next = { ...thisper}
    storage
      .del(id, next)
        .then(returnedValue => {
        setPersons(persons.filter(x => x.id != id))
        console.log(returnedValue)
        setErrorMessage(
          `deleted ${thisper.name} successfully!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
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
      <Notification message={errorMessage} state={errorMessageState} />

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
        <ContactBook whatToShow={whatToShow} deleter={deleter}/>
      </ul>
    </div>
  )

}

export default App
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
      //date: new Date().toISOString(),
      //id: persons.length + 1,
    }

    if(persons.filter(per => per.name === newName).length > 0){
      alert(`${newName} is already on the contactbook`)
    }else {
      setPersons(persons.concat(noteObject))
      setNewName('')
      setNewNumber('')
    }
  
    
  }

  const Person = ({ person }) => {
    return (
      <p>{person.name}, {person.number}</p>
    )
  }

  const handleChangeName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleChangeNum = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleChangeSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const whatToShow = persons.filter(x => x.name.toLocaleLowerCase('no-no').includes(newSearch) == true)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter the search: <input
            value={newSearch}
            onChange={handleChangeSearch}
            />
      </div>
      <h2>Add numbers</h2>
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
      
      <h2>Numbers</h2>
      <ul>
        {whatToShow.map(person =>
          <Person key={person.name} person={person}/>
        )}
      </ul>
    </div>
  )

}

export default App
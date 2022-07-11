import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0501234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )

}

export default App
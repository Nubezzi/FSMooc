import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      //date: new Date().toISOString(),
      //id: persons.length + 1,
    }

    if(persons.filter(per => per.name === newName).length > 0){
      alert(`${newName} is already on the contactbook`)
    }else {
      setPersons(persons.concat(noteObject))
      setNewName('')
    }
  
    
  }

  const Person = ({ person }) => {
    return (
      <p>{person.name}</p>
    )
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleChange}
            />
        </div>
            <button type="submit">save</button>
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
import { useState, useEffect } from 'react'
import axios from 'axios'
// import Persons from './persons'

const Filter = (props) => {
  return (
    <form>
      filter shown with <input value={props.newSearch} onChange={props.handleSearchChange} />
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Numbers = (props) => {
  if (props.newSearch === '') {
    const copy = props.value
    return (
      <div>
        {copy.map(e => <p key={e.name}>{e.name}: {e.number}</p>)}
      </div>
    )
  } else {
    const copy = props.value.filter(e => e.name.includes(props.newSearch))
    return (
      <div>
        {copy.map(e => <p key={e.name}>{e.name}: {e.number}</p>)}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.map(e => e.name).includes(newName)) {
      alert(newName + ' is already added to phonebook')
    } else {
      const newObj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newObj))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h2>add an new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Numbers
        value={persons}
        newSearch={newSearch}
      />
    </div>
  )
}

export default App

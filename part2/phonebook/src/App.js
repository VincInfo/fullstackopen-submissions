import { useState } from 'react'


const Filter = (props) => {
  return (
    <form>
      filter shown with <input value={props.newSearch} onChange={props.handleSearchChange} />
    </form>
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

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    console.log(e.target.value)
    setNewSearch(e.target.value)
  }

  const addName = (e) => {
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
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add an new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers value={persons} newSearch={newSearch} />
    </div>
  )
}

export default App

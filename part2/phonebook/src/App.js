import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import notes from './services/notes'

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
    console.log(copy)
    console.log(copy.find(e => e.name === 'Alex'))
    copy.forEach(element => {
      console.log(element.name)
    });
    return (
      <div>
        {copy.map(e =>
          <div key={e.name} number={e.number} name={e.name}>
            {e.name}: {e.number}
            <button key={e.name} onClick={props.handleDelete} name={e.name} id={e.id}>delete</button>
          </div>)}
      </div>
    )
  } else {
    const copy = props.value.filter(e => e.name.includes(props.newSearch))
    console.log(copy)
    return (
      <div>
        {copy.map(e =>
          <div key={e.name} number={e.number} name={e.name}>
            {e.name}: {e.number}
            <button key={e.name} onClick={props.handleDelete} name={e.name} id={e.id}>delete</button>
          </div>)}
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
    noteService
      .getAll()
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
    const newObj = {
      name: newName,
      number: newNumber
    }
    if (persons.map(e => e.name).includes(newName)) {
      if(window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')){
        const previousPerson = persons.find(p => p.name === newName)
        noteService.update(previousPerson.id, {...previousPerson, number: newNumber})
          .then(response => setPersons(persons.map(p => p.id !== previousPerson.id ? p : response.data)))
      }
    } else {
      noteService
        .create(newObj)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (e) => {
    if (window.confirm('Dou you really want to delete ' + e.target.name + ' from the phonebook?')) {
      noteService.deletePerson(e.target.id)
        .then(() => setPersons(persons.filter(p => p.id != e.target.id)))
    }
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
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
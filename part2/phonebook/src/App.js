import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";

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
      <h2>Persons</h2>
      <PersonList
        value={persons}
        newSearch={newSearch}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
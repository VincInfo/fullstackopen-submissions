import { useState, useEffect } from 'react'
import personService from './services/notes'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import Notification from './components/Notification';
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
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

  const makeMessage = (e) => {
    setMessage(e)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const newObj = {
      name: newName,
      number: newNumber
    }
    if (persons.map(e => e.name).includes(newName)) {
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        const previousPerson = persons.find(p => p.name === newName)
        personService
          .update(previousPerson.id, { ...previousPerson, number: newNumber })
          .then(response => setPersons(persons.map(p => p.id !== previousPerson.id ? p : response.data)))
          .catch(error => {
            console.log(error)
            makeMessage("Changing number failed, " + newName + " was already removed from the phonebook")
          })
        makeMessage("Number of " +  newName + " changed successfully")
      }
    } else {
      personService
        .create(newObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          makeMessage(newName + " added successfully")
        })
        .catch(error => {
          console.log(error)
          makeMessage(error.response.data.error)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (e) => {
    if (window.confirm('Dou you really want to delete ' + e.target.name + ' from the phonebook?')) {
      personService
        .deletePerson(e.target.id)
        .then(() => {
          setPersons(persons.filter(p => p.id != e.target.id))
          makeMessage("Person deleted successfully")
        })
        .catch(error => {
          console.log(error)
          makeMessage("Deleting person failed")
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <Filter
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />
      <h2>add new Person</h2>
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
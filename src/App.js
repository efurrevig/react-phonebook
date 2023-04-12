import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Form from './components/Form'
import Filter from './components/Filter'
import Button from './components/Button'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [shownPersons, setShownPersons] = useState([...persons])
  const [filter, setFilter] = useState('')



  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setShownPersons(initialPersons)
      })
  }, [])

  const deletePerson = (id) => {
    personService.remove(id)
    setPersons(persons.filter(person => person.id !== id))
    setShownPersons(shownPersons.filter(person => person.id !== id))
  }

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then(returnedObject => {
        setPersons(persons.map(person => person.id !== id ? person : returnedObject))
        setShownPersons(shownPersons.map(person => person.id !== id ? person : returnedObject))
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (checkName(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, would you like to replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const personObject = {
          ...person,
          number: newNumber
        }
        updatePerson(person.id, personObject)
      }
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
      .create(personObject)
      .then((returnedObject) => {
        setPersons(persons.concat(returnedObject))
        setShownPersons([...persons, returnedObject])
        setNewName('')
        setNewNumber('')
        setFilter('')
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShownPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }


  const inputs = [
    { 
      label: 'name', 
      value: newName, 
      onChange: handleNameChange 
    },
    { 
      label: 'number', 
      value: newNumber, 
      onChange: handleNumberChange 
    }
  ]


  const checkName = (name) => {
    return persons.some(person => person.name === name)
  } 
  
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={filter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <Form onSubmit={addPerson} inputs={inputs} />
      <h2>Numbers</h2>
      {shownPersons.map(person => 
                        <Person key={person.name} person={person} onDelete={deletePerson}/>)}
    </div>
  )
}

export default App
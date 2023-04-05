import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Form from './components/Form'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [shownPersons, setShownPersons] = useState([...persons])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setShownPersons(response.data)
      })
  }

  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    if (checkName(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setShownPersons([...persons, personObject])
    setNewName('')
    setNewNumber('')
    setFilter('')
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
      {shownPersons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App
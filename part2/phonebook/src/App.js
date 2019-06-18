import React, { useState, useEffect, useCallback } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const usePersonFetch = setter => {
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setter(response.data);
      })
      .catch(error => {
        console.warn(`Can't fetch persons: ${error}`);
      });
  }, [setter]);
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const compareByPersonName = (p1, p2) => p1.name.localeCompare(p2.name);
  const setPersonsSorted = useCallback(
    persons => setPersons([...persons].sort(compareByPersonName)),
    [setPersons]
  );
  usePersonFetch(setPersonsSorted);

  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const validateInput = () => {
    if (!newName) {
      alert("Name can't be empty!");
      return false;
    }
    if (!newNumber) {
      alert("Number can't be empty!");
      return false;
    }
    if (persons.findIndex(p => p.name === newName) !== -1) {
      alert(`${newName} is already in the phonebook.`);
      return false;
    }
    return true;
  };

  const handleNameSubmit = event => {
    event.preventDefault();
    if (!validateInput()) {
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    setPersonsSorted(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  let filteredPersons = persons;
  if (filter) {
    filteredPersons = persons.filter(
      p => p.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1
    );
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={setFilter} />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={setNewName}
        onNumberChange={setNewNumber}
        onSubmit={handleNameSubmit}
      />
      <h3>Numbers</h3>
      <Persons list={filteredPersons} />
    </div>
  );
};

export default App;

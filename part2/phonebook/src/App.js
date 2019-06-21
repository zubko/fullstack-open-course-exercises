import React, { useState, useEffect, useCallback } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebookService";

const usePersonFetch = setter => {
  useEffect(() => {
    phonebookService
      .getAll()
      .then(setter)
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
    if (persons.find(p => p.name === newName && p.number === newNumber)) {
      alert(`${newName} with number ${newNumber} is already in the phonebook.`);
      return false;
    }

    return true;
  };

  const checkUpdateNumber = () => {
    const p = persons.find(p => p.name === newName);
    if (!p) {
      return false;
    }
    if (
      !window.confirm(
        `${newName} is already in the phonebook.\nDo you want to update the number?`
      )
    ) {
      return false;
    }
    const id = p.id;
    phonebookService
      .put(id, { ...p, number: newNumber })
      .then(updatedPerson => {
        setPersons(persons.map(p => (p.id !== id ? p : updatedPerson)));
        setNewName("");
        setNewNumber("");
      })
      .catch(() => alert("Failed to update the number on the server."));
    return true;
  };

  const handleNameSubmit = event => {
    event.preventDefault();
    if (!validateInput()) {
      return;
    }
    if (checkUpdateNumber()) {
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    phonebookService
      .create(newPerson)
      .then(newPerson => {
        setPersonsSorted(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch(() => alert("Failed to send a person to the server."));
  };

  const handleDelete = id => {
    if (!window.confirm("Are you sure?")) return;
    phonebookService
      .del(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      })
      .catch(() => alert("Failed to delete from the server."));
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
      <Persons list={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;

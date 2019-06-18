import React, { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const sortByPersonName = (p1, p2) => p1.name.localeCompare(p2.name);

  const [persons, setPersons] = useState(
    [
      { name: "John Lovelace", number: "123-456-9876" },
      { name: "Arto Lovelace", number: "123-456-7890" },
      { name: "Jack Lovelace", number: "123-456-3453" },
      { name: "Mick Lovelace", number: "123-456-1234" }
    ].sort(sortByPersonName)
  );
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
    setPersons(
      persons
        .concat({ name: newName, number: newNumber })
        .sort(sortByPersonName)
    );
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons = filter
    ? persons.filter(
        p =>
          p.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1
      )
    : persons;

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

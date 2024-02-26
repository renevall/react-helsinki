import { useState, useEffect } from "react";
import axios from "axios";

import Search from "../components/Search";
import PersonForm from "../components/PersonForm";
import Persons from "../components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  console.log("render", persons.length, "persons");

  const onNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const onSearchChange = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (newName === "") {
      alert("Name cannot be empty");
      return;
    }
    if (newNumber === "") {
      alert("Number cannot be empty");
      return;
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const personsToShow =
    searchName === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        );

  return (
    <div>
      <Search searchName={searchName} onSearchChange={onSearchChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        onNameChange={onNameChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
      />
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";

import personService from "./services/persons";

import Search from "./components/Search";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

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

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNotification(`Added ${newName}`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    const result = window.confirm(`Delete ${person.name}?`);
    if (result) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification(`Deleted ${person.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch(() => {
          alert(`the person '${person.name}' was already deleted from server`);
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  const personsToShow =
    searchName === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        );

  return (
    <div>
      <Search
        searchName={searchName}
        onSearchChange={onSearchChange}
        notificationMessage={notification}
      />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        onNameChange={onNameChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
      />
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;

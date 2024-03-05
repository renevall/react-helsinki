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
  const [notification, setNotification] = useState({
    message: null,
    kind: null,
  });

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

    let operation = "Added";

    const foundPerson = persons.find((person) => person.name === newName);
    if (foundPerson !== undefined) {
      operation = "";
      const result = window.confirm(
        `${newName} is already added to phonebook, replace old number with new one?`
      );

      if (result) {
        operation = "Updated";
      }
    }

    if (operation === "") {
      return;
    }

    if (operation === "Updated") {
      console.log("Updating person");
      personService
        .update(foundPerson.id, personObject)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          );
          setNotification({
            message: `Updated ${newName}`,
            kind: "notification",
          });
          setTimeout(() => {
            setNotification({
              message: null,
              kind: null,
            });
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch(() => {
          setNotification({
            message: `Information of ${newName} has already been removed from server`,
            kind: "error",
          });
          setTimeout(() => {
            setNotification({
              message: null,
              kind: null,
            });
          }, 5000);
          setPersons(persons.filter((p) => p.id !== foundPerson.id));
        });
      return;
    }

    personService.create(personObject).then((returnedPerson) => {
      console.log("Adding person");
      setPersons(persons.concat(returnedPerson));
      setNotification({
        message: `Added ${newName}`,
        kind: "notification",
      });
      setTimeout(() => {
        setNotification({
          message: null,
          kind: null,
        });
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
          setNotification({
            message: `Deleted ${newName}`,
            kind: "notification",
          });
          setTimeout(() => {
            setNotification({
              message: null,
              kind: null,
            });
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
        notificationMessage={notification.message}
        notificationKind={notification.kind}
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

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => onDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;

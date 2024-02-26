const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, onDelete) => (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={onDelete}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;

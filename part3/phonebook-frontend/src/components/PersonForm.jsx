const PersonForm = ({
  addPerson,
  newName,
  onNameChange,
  newNumber,
  onNumberChange,
}) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button onClick={addPerson} type="submit">
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;

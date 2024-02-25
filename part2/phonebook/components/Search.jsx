const Search = ({searchName, onSearchChange}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input value={searchName} onChange={onSearchChange} />
      </div>
    </div>
  );
};

export default Search;

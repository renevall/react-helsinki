import Notification from "./Notification";

const Search = ({searchName, onSearchChange, notificationMessage}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <div>
        filter shown with:{" "}
        <input value={searchName} onChange={onSearchChange} />
      </div>
    </div>
  );
};

export default Search;

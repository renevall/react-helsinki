import Notification from "./Notification";

const Search = ({
  searchName,
  onSearchChange,
  notificationMessage,
  notificationKind,
}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} kind={notificationKind} />
      <div>
        filter shown with:{" "}
        <input value={searchName} onChange={onSearchChange} />
      </div>
    </div>
  );
};

export default Search;

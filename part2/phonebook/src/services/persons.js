import axios from "axios";

const getAll = () => {
  const request = axios.get("http://localhost:3001/persons");
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post("http://localhost:3001/persons", newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`http://localhost:3001/persons/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, remove };

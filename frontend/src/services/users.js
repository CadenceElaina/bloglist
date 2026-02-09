import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
};

const update = async (id, data) => {
  const response = await axios.put(`${baseUrl}/${id}`, data);
  return response.data;
};

// eslint-disable-next-line
export default { getAll, getUser, create, update };

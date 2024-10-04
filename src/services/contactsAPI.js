import axios from "axios";
import { CONTACTS_ENDPOINT } from "../utils/apiConfig";

const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const fetchContacts = async (token) => {
  setAuthHeader(token);
  const response = await axios.get(CONTACTS_ENDPOINT);
  return response.data;
};

// Similarly, for other contact API methods like addContact, deleteContact, etc.

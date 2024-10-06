import axios from "axios";
import { API_URLS } from "./apiConfig";

export const fetchContacts = () => axios.get(API_URLS.contacts);
export const addContact = (contact) => axios.post(API_URLS.contacts, contact);
export const deleteContact = (id) => axios.delete(`${API_URLS.contacts}/${id}`);

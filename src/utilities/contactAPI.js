import axios from 'axios';
import { CONTACTS_ENDPOINT } from './apiConfig';

// Get all contacts
export const getContacts = async () => {
  const response = await axios.get(CONTACTS_ENDPOINT);
  return response.data;
};

// Add a new contact
export const addNewContact = async (contact) => {
  const response = await axios.post(CONTACTS_ENDPOINT, contact);
  return response.data;
};

// Delete an existing contact
export const deleteExistingContact = async (id) => {
  await axios.delete(`${CONTACTS_ENDPOINT}/${id}`);
  return id;
};

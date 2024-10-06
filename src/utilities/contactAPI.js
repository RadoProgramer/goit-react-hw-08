// import axios from 'axios';
// import { CONTACTS_ENDPOINT } from './apiConfig';

// // Get all contacts
// export const getContacts = async () => {
//   const response = await axios.get(CONTACTS_ENDPOINT);
//   return response.data;
// };

// // Add a new contact
// export const addNewContact = async (contact) => {
//   const response = await axios.post(CONTACTS_ENDPOINT, contact);
//   return response.data;
// };

// // Delete an existing contact
// export const deleteExistingContact = async (id) => {
//   await axios.delete(`${CONTACTS_ENDPOINT}/${id}`);
//   return id;
// };


import axios from 'axios';
import { CONTACTS_ENDPOINT } from '../utilities/apiConfig';

// Utility to set the token in headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Fetch all contacts
export const getContacts = async (token) => {
  setAuthToken(token); // Set token in headers
  const response = await axios.get(CONTACTS_ENDPOINT);
  return response.data;
};

// Add a new contact
export const addNewContact = async (contact, token) => {
  setAuthToken(token); // Set token in headers
  const response = await axios.post(CONTACTS_ENDPOINT, contact);
  return response.data;
};

// Delete an existing contact
export const deleteExistingContact = async (id, token) => {
  setAuthToken(token); // Set token in headers
  await axios.delete(`${CONTACTS_ENDPOINT}/${id}`);
  return id;
};

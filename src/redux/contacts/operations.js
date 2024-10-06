import axios from 'axios';

// Fetch all contacts
export const getContacts = async () => {
  const response = await axios.get('/contacts');
  return response.data;
};

// Add a new contact
export const addNewContact = async (contact) => {
  const response = await axios.post('/contacts', contact);
  return response.data;
};

// Delete a contact by id
export const deleteExistingContact = async (id) => {
  await axios.delete(`/contacts/${id}`);
  return id;
};

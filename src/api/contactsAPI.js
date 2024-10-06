import axios from 'axios';

const API_URL = 'https://connections-api.herokuapp.com';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getContacts = async () => {
  const response = await axios.get(`${API_URL}/contacts`, getAuthHeaders());
  return response.data;
};

export const addNewContact = async (contact) => {
  const response = await axios.post(`${API_URL}/contacts`, contact, getAuthHeaders());
  return response.data;
};

export const deleteExistingContact = async (id) => {
  await axios.delete(`${API_URL}/contacts/${id}`, getAuthHeaders());
  return id;
};

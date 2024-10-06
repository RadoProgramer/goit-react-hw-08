import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchContacts, addContact, deleteContact } from '../../redux/contacts/contactsSlice';
import { setFilter } from '../../redux/filters/filtersSlice';
import { selectToken } from '../../redux/auth/selectors'; // Access token from Redux

export default function ContactsPage() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken); // Get the token from Redux store
  const { items: contacts, loading, error } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filters.name);

  useEffect(() => {
    if (token) {
      dispatch(fetchContacts(token)); // Pass token to fetchContacts
    }
  }, [dispatch, token]);

  const handleAddContact = (contact) => {
    dispatch(addContact({ contact, token })); // Pass contact and token to addContact
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact({ id, token })); // Pass id and token to deleteContact
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <DocumentTitle>Your Contacts</DocumentTitle>
      <h1>Contacts Manager</h1>
      {loading && <p>Loading contacts...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <SearchBox filter={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </>
  );
}

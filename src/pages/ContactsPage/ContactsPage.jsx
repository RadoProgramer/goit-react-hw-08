import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { fetchContacts, addContact, deleteContact } from '../../redux/contacts/contactsSlice';
import { setFilter } from '../../redux/filters/filtersSlice';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const { items: contacts, loading, error } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filters.name);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (contact) => {
    const isDuplicate = contacts.some(
      (existingContact) => existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${contact.name} is already in the contacts.`);
      return;
    }

    dispatch(addContact(contact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
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

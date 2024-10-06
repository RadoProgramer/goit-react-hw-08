import  { useEffect } from "react";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import "./Contacts.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchAllContacts,
	createContact,
	removeContact,
} from "../../redux/slices/contactsSlice";
import { setFilter } from "../../redux/slices/filtersSlice";

const Contacts = () => {
	const {
		items: contacts,
		loading,
		error,
	} = useSelector((state) => state.contacts);
	const filter = useSelector((state) => state.filters.name);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllContacts());
	}, [dispatch]);

	const handleAddContact = (contact) => {
		const isDuplicate = contacts.some(
			(existingContact) =>
				existingContact.name.toLowerCase() === contact.name.toLowerCase()
		);

		if (isDuplicate) {
			alert(`${contact.name} is already in the contacts.`);
			return;
		}

		dispatch(createContact(contact));
	};

	const handleDeleteContact = (id) => {
		dispatch(removeContact(id));
	};

	const handleFilterChange = (e) => {
		dispatch(setFilter(e.currentTarget.value));
	};

	const filteredContacts = contacts.filter((contact) =>
		contact.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<div className="contacts">
			<h1>Phonebook</h1>
			{loading && <p>Loading contacts...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}
			<ContactForm onAddContact={handleAddContact} />
			<h2>Contacts</h2>
			<SearchBox filter={filter} onChange={handleFilterChange} />
			<ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
		</div>
	);
};

export default Contacts;

import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
	getContacts,
	getFilter,
	getIsLoading,
} from "../../redux/contacts/selectors";
import { ContactsList } from "../../components/ContactList/ContactList";
import { ContactForm } from "../../components/ContactForm/ContactForm";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import {
	fetchContacts,
	addContact,
	deleteContact,
} from "../../redux/contacts/operations";
import { useEffect } from "react";
import css from "./ContactPage.module.css";

const ContactsPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(getIsLoading);
	const contacts = useSelector(getContacts);
	const filter = useSelector(getFilter);

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	const handleSubmit = (contactData) => {
		dispatch(addContact(contactData));
	};

	const handleDelete = (id) => {
		dispatch(deleteContact(id));
	};

	return (
		<HelmetProvider>
			<div>
				<Helmet>
					<title>Your Contacts</title>
				</Helmet>
				<ContactForm onSubmit={handleSubmit} />
				<SearchBar />
				{isLoading && (
					<div className={css["loader-wrapper"]}>
						<span className={css.loader}></span>
					</div>
				)}
				<ContactsList
					contacts={contacts}
					filter={filter}
					onDelete={handleDelete}
				/>
			</div>
		</HelmetProvider>
	);
};

export default ContactsPage;

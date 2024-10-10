import { useState } from "react";
import { useSelector } from "react-redux";
import {
	getContacts,
	getFilter,
	getIsLoading,
} from "../../redux/contacts/selectors";
import { EditContactForm } from "../EditContactForm/EditContactForm";
import Fuse from "fuse.js";
import css from "./ContactList.module.css";

export const ContactsList = ({ onDelete }) => {
	const contacts = useSelector(getContacts);
	const filter = useSelector(getFilter);
	const isLoading = useSelector(getIsLoading);
	const [editingContact, setEditingContact] = useState(null);

	const fuse = new Fuse(contacts, {
		keys: ["name", "number"],
		threshold: 0.3,
	});

	const filteredContacts = filter
		? fuse.search(filter).map((result) => result.item)
		: contacts;

	const handleEditClick = (contact) => {
		setEditingContact(contact);
	};

	const closeEditForm = () => {
		setEditingContact(null);
	};

	return (
		<div className={css.container}>
			{isLoading ? (
				<div>Loading...</div>
			) : editingContact ? (
				<EditContactForm contact={editingContact} onClose={closeEditForm} />
			) : (
				<table className={css.table}>
					<thead className={css.theading}>
						<tr>
							<th>Name</th>
							<th>Phone Number</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredContacts.map((contact) => (
							<tr className={css.tbody} key={contact.id}>
								<td>{contact.name}</td>
								<td>{contact.number}</td>
								<td>
									<button
										className={css.buttonEdit}
										onClick={() => handleEditClick(contact)}
									>
										Edit
									</button>
									<button
										className={css.buttonDelete}
										onClick={() => onDelete(contact.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

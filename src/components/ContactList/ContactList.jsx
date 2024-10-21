import { useState } from "react";
import { useSelector } from "react-redux";
import { getContacts, getFilter } from "../../redux/contacts/selectors";
import { EditContactForm } from "../EditContactForm/EditContactForm";
import Fuse from "fuse.js";
import { toast } from "react-toastify";
import { Modal } from "../Modal/Modal";
import css from "./ContactList.module.css";

export const ContactsList = ({ onDelete }) => {
	const contacts = useSelector(getContacts);
	const filter = useSelector(getFilter);
	const [editingContact, setEditingContact] = useState(null);
	const [contactToDelete, setContactToDelete] = useState(null);

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

	const handleDelete = (contact) => {
		setContactToDelete(contact);
	};

	const confirmDelete = () => {
		if (contactToDelete) {
			onDelete(contactToDelete.id);
			toast.success("Contact deleted successfully!");
			setContactToDelete(null);
		}
	};

	const closeDeleteModal = () => {
		setContactToDelete(null);
	};

	return (
		<div className={css.container}>
			{editingContact ? (
				<EditContactForm contact={editingContact} onClose={closeEditForm} />
			) : filteredContacts.length > 0 ? (
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
										onClick={() => handleDelete(contact)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className={css.noContacts}>No contacts found</p>
			)}

			{}
			{contactToDelete && (
				<Modal
					contactName={contactToDelete.name}
					onClose={closeDeleteModal}
					onConfirm={confirmDelete}
				/>
			)}
		</div>
	);
};

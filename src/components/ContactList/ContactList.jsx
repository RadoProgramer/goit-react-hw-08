import PropTypes from "prop-types";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { getContacts, getFilter } from "../../redux/contacts/selectors";
import Fuse from "fuse.js";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { toast } from "react-hot-toast";

export const ContactsList = ({ onDelete }) => {
	const contacts = useSelector(getContacts);
	const filter = useSelector(getFilter);
	const [selectedContact, setSelectedContact] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fuse = new Fuse(contacts, {
		keys: ["name", "number"],
		threshold: 0.3,
	});

	const filteredContacts = filter
		? fuse.search(filter).map((result) => result.item)
		: contacts;

	const openModal = (contact) => {
		setSelectedContact(contact);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedContact(null);
		setIsModalOpen(false);
	};

	const handleDelete = () => {
		if (selectedContact) {
			onDelete(selectedContact.id);
			toast.success(`Contact "${selectedContact.name}" deleted successfully!`);
			closeModal();
		}
	};

	return (
		<div className={css.container}>
			{filteredContacts.length > 0 ? (
				<table className={css.table}>
					<thead className={css.theading}>
						<tr>
							<th>Name</th>
							<th>Phone Number</th>
							<th>Remove Contact</th>
						</tr>
					</thead>
					<tbody>
						{filteredContacts.map((contact) => (
							<tr className={css.tbody} key={contact.id}>
								<td className={css.name}>{contact.name}</td>
								<td>{contact.number}</td>
								<td>
									<button
										className={css.button}
										onClick={() => openModal(contact)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className={css.text}>No contacts found</p>
			)}

			{isModalOpen && (
				<Modal
					contactName={selectedContact.name}
					onClose={closeModal}
					onConfirm={handleDelete}
				/>
			)}
		</div>
	);
};

ContactsList.propTypes = {
	contacts: PropTypes.array.isRequired,
	filter: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired,
};

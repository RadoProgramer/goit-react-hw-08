import React from "react";
import ContactItem from "../ContactItem/ContactItem";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts, onDelete }) => {
	return (
		<ul className={styles.list}>
			{contacts.map((contact) => (
				<ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
			))}
		</ul>
	);
};

export default ContactList;

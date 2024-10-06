import React from "react";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import styles from "./ContactItem.module.css";

const ContactItem = ({ contact, onDelete }) => {
	return (
		<li className={styles.contactItem}>
			<div className={styles.topRow}>
				<FaUser className={styles.icon} />
				<span className={styles.name}>{contact.name}</span>
			</div>
			<div className={styles.bottomRow}>
				<FaPhoneAlt className={styles.icon} />
				<span className={styles.number}>{contact.number}</span>
			</div>
			<button onClick={() => onDelete(contact.id)}>Delete</button>
		</li>
	);
};

export default ContactItem;

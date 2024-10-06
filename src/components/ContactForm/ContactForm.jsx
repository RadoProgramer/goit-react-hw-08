import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import styles from "./ContactForm.module.css";

const ContactForm = ({ onAddContact }) => {
	const initialValues = {
		name: "",
		number: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Required"),
		number: Yup.string().required("Required"),
	});

	const handleSubmit = (values, { resetForm }) => {
		const newContact = {
			id: nanoid(),
			name: values.name,
			number: values.number,
		};

		onAddContact(newContact);
		resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			<Form className={styles.form}>
				<label>Name</label>
				<Field type="text" name="name" />
				<ErrorMessage name="name" component="div" className={styles.error} />

				<label>Number</label>
				<Field type="text" name="number" />
				<ErrorMessage name="number" component="div" className={styles.error} />

				<button type="submit">Add contact</button>
			</Form>
		</Formik>
	);
};

export default ContactForm;

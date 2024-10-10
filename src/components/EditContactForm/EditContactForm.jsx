import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./EditContactForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operations";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
	name: Yup.string()
		.matches(
			/^[a-zA-Zа-яА-Я\u00C0-\u017F\s]+(([' \-][a-zA-Zа-яА-Я\u00C0-\u017F\s])?[a-zA-Zа-яА-Я\u00C0-\u017F\s]*)*$/,
			"Invalid name format. Only letters and spaces are allowed."
		)
		.required("Name is required"),
	number: Yup.string()
		.matches(
			/^\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}$/,
			"Invalid phone number format"
		)
		.required("Phone number is required"),
});

export const EditContactForm = ({ contact, onClose }) => {
	const dispatch = useDispatch();
	const [formattedNumber, setFormattedNumber] = useState(contact.number);

	const formatPhoneNumber = (value) => {
		if (!value) return value;

		const phoneNumber = value.replace(/[^\d]/g, "");

		const phoneNumberLength = phoneNumber.length;
		if (phoneNumberLength < 4) return phoneNumber;
		if (phoneNumberLength < 7) {
			return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
		}
		return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
			3,
			6
		)}-${phoneNumber.slice(6, 10)}`;
	};

	const handlePhoneChange = (e, setFieldValue) => {
		const formatted = formatPhoneNumber(e.target.value);
		setFormattedNumber(formatted);
		setFieldValue("number", formatted);
	};

	const handleSubmit = async (values) => {
		await dispatch(updateContact({ id: contact.id, ...values }));
		toast.success(`Contact "${values.name}" updated successfully!`);
		onClose();
	};

	return (
		<Formik
			initialValues={{ name: contact.name, number: contact.number }}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ setFieldValue }) => (
				<Form className={css.form}>
					<h3>Edit Contact</h3>

					<Field name="name" type="text" placeholder="Name" />
					<ErrorMessage name="name" component="div" className={css.error} />

					<Field
						name="number"
						type="tel"
						placeholder="Phone Number"
						value={formattedNumber}
						onChange={(e) => handlePhoneChange(e, setFieldValue)}
					/>
					<ErrorMessage name="number" component="div" className={css.error} />

					<button className={css.button} type="submit">
						Save
					</button>
					<button className={css.buttonCancel} type="button" onClick={onClose}>
						Cancel
					</button>
				</Form>
			)}
		</Formik>
	);
};

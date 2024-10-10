import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import css from "./ContactForm.module.css";

const validationSchema = Yup.object({
	name: Yup.string()
		.matches(
			/^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
			"Invalid name format"
		)
		.required("Name is required"),
	number: Yup.string()
		.matches(
			/^\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}$/,
			"Invalid phone number"
		)
		.required("Phone number is required"),
});

export const ContactForm = ({ onSubmit }) => {
	const handleSubmit = (values, { resetForm }) => {
		onSubmit(values);
		toast.success(`Contact "${values.name}" added successfully!`);
		resetForm();
	};

	return (
		<Formik
			initialValues={{ name: "", number: "" }}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{() => (
				<Form className={css.form}>
					<h3>Add Contact</h3>

					<Field name="name" type="text" placeholder="Name" />
					<ErrorMessage name="name" component="div" className={css.error} />

					<Field name="number" type="tel" placeholder="Phone Number" />
					<ErrorMessage name="number" component="div" className={css.error} />

					<button className={css.button} type="submit">
						Add contact
					</button>
				</Form>
			)}
		</Formik>
	);
};

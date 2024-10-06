import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

const ContactForm = ({ onAddContact }) => {
  const initialValues = { name: '', number: '' };

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
    number: Yup.string().min(8, 'Minimum 8 digits').required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onAddContact(values);
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <label>Name</label>
        <Field type="text" name="name" />
        <ErrorMessage name="name" component="div" />

        <label>Number</label>
        <Field type="text" name="number" />
        <ErrorMessage name="number" component="div" />

        <button type="submit">Add Contact</button>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;

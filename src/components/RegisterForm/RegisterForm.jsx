import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";

// Schemat walidacji za pomocą Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null); // Obsługa wiadomości o błędach

  const handleSubmit = async (values, { resetForm }) => {
    setErrorMessage(null); // Resetowanie wiadomości o błędzie przed wysyłaniem formularza
    try {
      await dispatch(register(values)).unwrap();
      resetForm();
    } catch (error) {
      setErrorMessage(error); // Ustawianie wiadomości o błędzie, jeśli wystąpi
    }
  };

  return (
    <div className={css.formModal}>
      <div className={css.signupForm}>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <h2 className={css.heading}>Please Register</h2>

              {/* Wyświetlanie błędu, jeśli wystąpi */}
              {errorMessage && <div className={css.error}>{errorMessage}</div>}

              <Field name="name" type="text" placeholder="Choose Username" />
              <ErrorMessage name="name" component="div" className={css.error} />

              <Field name="email" type="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className={css.error} />

              <Field
                name="password"
                type="password"
                placeholder="Create password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />

              <button className={`${css.btn} ${css.signup}`} type="submit">
                Create Account
              </button>

              <p>
                Clicking <strong>create account</strong> means you agree to our{" "}
                <a href="!#">terms of services</a>.
              </p>
              <hr />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

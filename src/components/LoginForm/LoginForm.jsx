import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const validationSchema = Yup.object({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
});

export const LoginForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = (values, { resetForm }) => {
		dispatch(logIn(values));
		resetForm();
	};

	return (
		<div className={css.formModal}>
			<div className={css.loginForm}>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{() => (
						<Form>
							<h2 className={css.heading}>Please Log In</h2>

							<Field
								name="email"
								type="email"
								placeholder="Please enter your email"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className={css.error}
							/>

							<Field
								name="password"
								type="password"
								placeholder="Please enter your password"
							/>
							<ErrorMessage
								name="password"
								component="div"
								className={css.error}
							/>

							<button className={`${css.btn} ${css.login}`} type="submit">
								Log In
							</button>
							<p>
								<a href="!#">Forgotten account</a>
							</p>
							<hr />
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

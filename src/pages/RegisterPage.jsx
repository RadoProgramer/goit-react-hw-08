import { Helmet, HelmetProvider } from "react-helmet-async";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
	return (
		<HelmetProvider>
			<div>
				<Helmet>
					<title>Registration</title>
				</Helmet>
				<RegisterForm />
			</div>
		</HelmetProvider>
	);
};

export default RegisterPage;

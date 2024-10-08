import { Helmet, HelmetProvider } from "react-helmet-async";
import { LoginForm } from "../components/LoginForm/LoginForm";

const LoginPage = () => {
	return (
		<HelmetProvider>
			<div>
				<Helmet>
					<title>Login</title>
				</Helmet>
				<LoginForm />
			</div>
		</HelmetProvider>
	);
};

export default LoginPage;

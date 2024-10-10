import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";
import { PrivateRoute } from "../PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute";
import { refreshUser } from "../../redux/auth/operations";
import { useAuth } from "../../hook/useAuth";
import css from "./App.module.css";

const Home = lazy(() => import("../../pages/Home/Home"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const ContactsPage = lazy(() =>
	import("../../pages/ContactsPage/ContactsPage")
);

export const App = () => {
	const dispatch = useDispatch();
	const { isRefreshing } = useAuth();

	useEffect(() => {
		dispatch(refreshUser());
	}, [dispatch]);

	return isRefreshing ? (
		<div className={css["loader-wrapper"]}>
			<span className={css.loader}></span>
		</div>
	) : (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route
						path="/register"
						element={
							<RestrictedRoute
								redirectTo="/contacts"
								component={<RegisterPage />}
							/>
						}
					/>
					<Route
						path="/login"
						element={
							<RestrictedRoute
								redirectTo="/contacts"
								component={<LoginPage />}
							/>
						}
					/>
					<Route
						path="/contacts"
						element={
							<PrivateRoute redirectTo="/login" component={<ContactsPage />} />
						}
					/>
				</Route>
			</Routes>
		</Suspense>
	);
};

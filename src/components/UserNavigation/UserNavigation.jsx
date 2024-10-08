import { NavLink } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import css from "./UserNavigation.module.css";

export const UserNavigation = () => {
	const { isLoggedIn } = useAuth();

	return (
		<nav className={css.container}>
			<NavLink
				to="/"
				className={(navData) => (navData.isActive ? css.active : css.link)}
			>
				Home
			</NavLink>
			{isLoggedIn && (
				<NavLink
					to="/contacts"
					className={(navData) => (navData.isActive ? css.active : css.link)}
				>
					Contacts
				</NavLink>
			)}
		</nav>
	);
};

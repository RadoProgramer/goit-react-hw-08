import { NavLink } from "react-router-dom";
import css from "./HomeNavigation.module.css";

export const HomeNavigation = () => {
	return (
		<nav className={css.container}>
			<NavLink
				to="/register"
				className={(navData) => (navData.isActive ? css.active : css.link)}
			>
				Register
			</NavLink>
			<NavLink
				to="/login"
				className={(navData) => (navData.isActive ? css.active : css.link)}
			>
				Log In
			</NavLink>
		</nav>
	);
};

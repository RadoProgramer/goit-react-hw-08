import { UserNavigation } from "../UserNavigation/UserNavigation";
import { UserMenu } from "../UserMenu/UserMenu";
import { HomeNavigation } from "../HomeNavigation/HomeNavigation";
import { useAuth } from "../../hook/useAuth";
import css from "./AppBar.module.css";

export const AppBar = () => {
	const { isLoggedIn } = useAuth();

	return (
		<header className={css.header}>
			<UserNavigation />
			{isLoggedIn ? <UserMenu /> : <HomeNavigation />}
		</header>
	);
};

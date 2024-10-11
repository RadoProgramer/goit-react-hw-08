import css from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/contacts/contactsSlice";

export const SearchBar = () => {
	const dispatch = useDispatch();

	const handleSearch = (e) => {
		dispatch(setFilter(e.target.value));
	};

	return (
		<div className={css.search}>
			<h3>Find Contact</h3>
			<input
				className={css.input}
				id="searchField"
				type="text"
				name="filter"
				onChange={handleSearch}
				placeholder="Search by name or number"
			/>
		</div>
	);
};

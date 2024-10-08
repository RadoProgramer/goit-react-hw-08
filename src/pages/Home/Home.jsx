import css from "./Home.module.css";

const Home = () => {
	return (
		<div className={css.container}>
			<h1>Welcome to The Phonebook</h1>
			<p className={css.one}>The best user firendly online based phonebook</p>
		</div>
	);
};

export default Home;

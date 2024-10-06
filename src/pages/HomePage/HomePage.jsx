import DocumentTitle from "../../components/DocumentTitle";

const HomePage = () => {
	return (
		<>
			<DocumentTitle>Home</DocumentTitle>
			<div
				style={{
					minHeight: "calc(100vh - 50px)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<h1 style={{ fontWeight: 500, fontSize: 48, textAlign: "center" }}>
					Welcome to the Contact Manager{" "}
					<span role="img" aria-label="Greeting icon">
						💁‍♀️
					</span>
				</h1>
			</div>
		</>
	);
};

export default HomePage;

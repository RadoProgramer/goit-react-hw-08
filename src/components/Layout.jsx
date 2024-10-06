import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "./AppBar/AppBar";

export const Layout = () => {
	return (
		<div style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px" }}>
			<AppBar />
			<Suspense fallback={<div>Loading...</div>}>
				<Outlet />
			</Suspense>
		</div>
	);
};

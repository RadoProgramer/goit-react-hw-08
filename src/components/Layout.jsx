import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { AppBar } from "./AppBar/AppBar";

export const Layout = () => {
	return (
		<div>
			<AppBar />
			<Suspense fallback={null}>
				<Outlet />
			</Suspense>
			<Toaster position="top-center" reverseOrder={false} /> {}
		</div>
	);
};

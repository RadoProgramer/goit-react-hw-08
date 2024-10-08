import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "./index.css";

const basename = "/";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter basename={basename}>
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>
);

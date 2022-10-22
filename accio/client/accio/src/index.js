import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { MultiplePageWarning } from "pages";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MemoryRouter>
			<App />
		</MemoryRouter>
	</React.StrictMode>
);

const channel = new BroadcastChannel("multi-page-detection-channel");
let isAuthenticPage = true;
channel.postMessage("authentic-page-open");
channel.addEventListener("message", (msg) => {
	if (msg.data === "authentic-page-open" && isAuthenticPage) {
		channel.postMessage("reject-new-duplicate-pages");
	} else if (msg.data === "reject-new-duplicate-pages") {
		isAuthenticPage = false;
		root.render(
			<React.StrictMode>
				<MultiplePageWarning />
			</React.StrictMode>
		);
	}
});


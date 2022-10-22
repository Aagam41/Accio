import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

const ToastifyContainer = styled(ToastContainer)`
	.Toastify__toast {
		border-radius: 1em;
		padding: 1em;
	}
	&&&.Toastify__toast-container {
		width: max-content;
	}
	.Toastify__toast-icon {
		font-size: 2em;
		padding-right: 1.5em;
	}
	.Toastify__toast-theme--colored.Toastify__toast--error {
		background-color: ${(props) => (props.externalTheme === "light" ? "#dc4444" : "#dc3545")};
		color: #ffffff;
	}
	.Toastify__toast-theme--colored.Toastify__toast--warning {
		color: #000000;
	}
	.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
		background-color: ${(props) => (props.externalTheme === "light" ? "#ea868f" : "#ea868f")};
	}
`;

const reactRoot = document.getElementById("root").parentElement;
let tostifyContainerRoot = null;

if (!document.getElementById("auth-toastify-container")) {
	tostifyContainerRoot = document.createElement("div");
	reactRoot.insertBefore(tostifyContainerRoot, reactRoot.firstChild);
}

const toastifyContainerReactRoot = ReactDOM.createRoot(tostifyContainerRoot);
toastifyContainerReactRoot.render(
	<ToastifyContainer
		enableMultiContainer
		containerId={"auth-toastify-container"}
		position="top-center"
		autoClose={5000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick={true}
		closeButton={false}
		rtl={false}
		pauseOnFocusLoss={true}
		draggable={true}
		pauseOnHover={true}
		theme="colored"
		progress={undefined}
		icon="🔐"
		externalTheme="dark"
	/>
);


import React, { createContext, useContext, useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Root, Login } from "pages";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth, AuthContext } from "services/authentication";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "react-modal-hook";
import { AUTHENTICATION_SERVICE_REACT_LOGIN_ROUTE } from "config";

const AppContainer = styled.div`
	position: relative;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	border: none;
`;

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
		background-color: ${(props) => (props.externalTheme === "light" ? "#dc3545" : "#dc3545")};
		color: #ffffff;
	}
	.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
		background-color: ${(props) => (props.externalTheme === "light" ? "#ea868f" : "#ea868f")};
	}
`;

function App() {
	const navigate = useNavigate();
	const { user, setUser, register, login, logout, handleTokenExpiration, refreshToken } = useAuth();

	useEffect(() => {
		user || navigate(AUTHENTICATION_SERVICE_REACT_LOGIN_ROUTE);
	}, [user]);

	return (
		<AppContainer>
			<ModalProvider>
				<ToastifyContainer
					enableMultiContainer
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
					icon="🦄"
					externalTheme="light"
				/>
				<AuthContext.Provider value={{ user, setUser, register, login, logout, handleTokenExpiration, refreshToken }}>
					<Routes>
						<Route path="/" element={user ? <Root /> : <Navigate to="/login" />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</AuthContext.Provider>
			</ModalProvider>
		</AppContainer>
	);
}

export default App;


import React, { createContext, useContext, useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Root, Login } from "pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthContext } from "services/authentication";
import { ToastContainer, toast } from "react-toastify";

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
	.Toastify__toast-body {
		padding: 1em;
	}
	.Toastify__toast-icon {
		font-size: 2em;
		padding-right: 1.5em;
	}
	.Toastify__toast-theme--colored.Toastify__toast--error {
		background-color: #ff4545;
	}
`;

function App() {
	const { user, setUser, register, login, logout, handleTokenExpiration, refreshToken } = useAuth();

	console.log("App", user);

	return (
		<AppContainer>
			<ToastifyContainer />
			<AuthContext.Provider value={{ user, setUser, register, login, logout, handleTokenExpiration, refreshToken }}>
				<Routes>
					<Route path="/" element={user ? <Root /> : <Navigate to="/login" />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</AuthContext.Provider>
		</AppContainer>
	);
}

export default App;


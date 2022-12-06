import { useCallback, useEffect, useMemo, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { axiosInstance, useToken } from "services/authentication";
import {
	AUTHENTICATION_API_LOGIN_URL,
	AUTHENTICATION_API_REFRESH_TOKEN_URL,
	AUTHENTICATION_API_REGISTER_URL,
	AUTHENTICATION_SERVICE_REACT_LOGIN_ROUTE,
	AUTHENTICATION_SERVICE_REACT_LOGOUT_ROUTE,
} from "config";
import "./toastifyComponent.js";
import { toast } from "react-toastify";
import { registerHandleResponseError, loginHandleResponseError } from "./abstraction";

function useAuth() {
	const navigate = useNavigate();
	const [header, setHeader] = useState(null);
	const [payload, setPayload] = useState(null);
	const [user, setUser] = useState(null);
	const handleTokenExpiration = useCallback(refreshToken, []);
	const extractTokenPayloadAndSetUser = (token) => {
		if (token) {
			const tokenPartition = token.split(".");
			const header = JSON.parse(atob(tokenPartition[0]));
			const payload = JSON.parse(atob(tokenPartition[1]));
			setHeader(header);
			setPayload({ username: payload.username, fullname: payload.fullname });
			setUser({ username: payload.username, fullname: payload.fullname });
		} else {
			setHeader(null);
			setPayload(null);
			setUser(null);
		}
	};
	const handleTokenInvalidation = () => extractTokenPayloadAndSetUser(null);
	const { clearToken, setToken } = useToken(handleTokenInvalidation, handleTokenExpiration);

	// acts as constructor to initialize tokens, react components like Toastify Conatiner
	useMemo(async () => {
		await handleTokenExpiration();
		user && navigate("/");
	}, [handleTokenExpiration]);

	const logout = useCallback(() => {
		extractTokenPayloadAndSetUser(null);
		setToken(null);
		navigate(AUTHENTICATION_SERVICE_REACT_LOGOUT_ROUTE);
		// clearToken().finally(() => {
		// 	setUser(null);
		// 	navigate(AUTHENTICATION_SERVICE_REACT_LOGOUT_ROUTE);
		// });
	}, [clearToken]);

	const register = useCallback(
		async (userToRegister) => {
			try {
				const response = await axiosInstance.post(AUTHENTICATION_API_REGISTER_URL, userToRegister);
				navigate(AUTHENTICATION_SERVICE_REACT_LOGIN_ROUTE);
			} catch (error) {
				if (error.response) {
					registerHandleResponseError("register", error);
				} else if (error.request) {
					toast.info("Couldn't connect to the Authentication Service. Please try again later", {
						toastId: "useauth_register_error_request",
						icon: "💁",
						externalTheme: "dark",
						containerId: "auth-toastify-container",
					});
					console.log("useAuth Error [register -> error.request]:", error.request);
				} else {
					toast.error("Someting has gone wrong", {
						toastId: "useauth_register_error",
						icon: "🦨",
						externalTheme: "dark",
						containerId: "auth-toastify-container",
					});
					console.log("useAuth Error [register]:", error.message);
				}
			}
		},
		[setToken]
	);

	const login = useCallback(
		async (username, password) => {
			try {
				const response = await axiosInstance.post(AUTHENTICATION_API_LOGIN_URL, {
					username,
					password,
				});
				extractTokenPayloadAndSetUser(response.data.access);
				setToken(response.data.access);
				localStorage.setItem("refresh_token", response.data.refresh);
			} catch (error) {
				if (error.response) {
					loginHandleResponseError(error);
				} else if (error.request) {
					toast.info("Couldn't connect to the Authentication Service. Please try again later", {
						toastId: "useauth_login_error_request",
						icon: "💁",
						externalTheme: "dark",
						containerId: "auth-toastify-container",
					});
					console.log("useAuth Error [login -> error.request]:", error.request);
				} else {
					toast.error("Someting has gone wrong", {
						toastId: "useauth_login_error",
						icon: "🦨",
						externalTheme: "dark",
						containerId: "auth-toastify-container",
					});
					console.log("useAuth Error [login]:", error.message);
				}
			}
		},
		[setToken]
	);

	async function refreshToken() {
		showLoader();
		const refresh = localStorage.getItem("refresh_token");
		if (refresh) {
			try {
				const response = await axiosInstance.post(AUTHENTICATION_API_REFRESH_TOKEN_URL, {
					refresh,
				});
				extractTokenPayloadAndSetUser(response.data.access);
				setToken(response.data.access);
				localStorage.setItem("refresh_token", response.data.refresh);
			} catch (error) {
				if (error.response) {
					toast.error("No active account found with the given credentials", {
						toastId: "useauth_refresh_token_error_response",
						icon: "🚨",
						externalTheme: "dark",
						containerId: "auth-toastify-container",
						onClose: () => {
							navigate(AUTHENTICATION_SERVICE_REACT_LOGIN_ROUTE);
						},
					});
					console.log(
						"useAuth Error [refreshToken -> error.response]:",
						error.response.status,
						error.response.data,
						error.response.headers
					);
				} else if (error.request) {
					toast.info("Couldn't connect to the Authentication Service. Please try again later", {
						toastId: "useauth_refresh_token_error_request",
						icon: "💁",
						externalTheme: "dark",
						containerId: "auth-toastify-container",
						onClose: () => {
							navigate(AUTHENTICATION_SERVICE_REACT_LOGIN_ROUTE);
						},
					});
					console.log("useAuth Error [refreshToken -> error.request]:", error.request);
				} else {
					toast.error("Someting has gone wrong", {
						toastId: "useauth_refresh_token_error",
						icon: "🦨",
						externalTheme: "dark",
						containerId: "auth-toastify-container",
						onClose: () => {
							navigate(AUTHENTICATION_SERVICE_REACT_LOGIN_ROUTE);
						},
					});
					console.log("useAuth Error [refreshToken]:", error.message);
				}
			}
		} else {
			toast.warning("Couldn't validate credentials", {
				toastId: "useauth_refresh_token_not_found",
				icon: "🚧",
				externalTheme: "dark",
				containerId: "auth-toastify-container",
				onClose: () => {
					navigate(AUTHENTICATION_SERVICE_REACT_LOGIN_ROUTE);
				},
			});
		}
		showLoader(false);
	}

	function showLoader(show = true) {
		if (show) {
			toast.info("Loading data... Please wait", {
				toastId: "useauth_loading",
				icon: "🔃",
				externalTheme: "dark",
				containerId: "auth-toastify-container",
				autoClose: false,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				closeButton: false,
			});
		} else {
			toast.dismiss("useauth_loading");
		}
	}

	return {
		user,
		setUser,
		header,
		setHeader,
		payload,
		setPayload,
		register,
		login,
		logout,
		handleTokenExpiration,
		refreshToken,
	};
}

export default useAuth;


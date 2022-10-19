import { useCallback, useEffect, useMemo, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { axiosInstance, useToken } from "services/authentication";
import {
	AUTH_API_AUTHORIZATION_HEADER,
	AUTH_API_BASE_URL,
	AUTH_API_LOGIN_URL,
	AUTH_API_LOGOUT_URL,
	AUTH_API_REFRESH_TOKEN_URL,
	AUTH_API_REGISTER_URL,
	BASE_URL,
} from "config";

function useAuth() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const handleTokenExpiration = useCallback(refreshToken, []);

	const handleTokenInvalidation = () => setUser(null);
	const { clearToken, setToken, tokenExists } = useToken(handleTokenInvalidation, handleTokenExpiration);

	useMemo(async () => {
		await handleTokenExpiration();
		console.log("Reresh on first render");
		user && navigate("/");
	}, [handleTokenExpiration]);

	const logout = useCallback(() => {
		clearToken().finally(() => {
			setUser(null);
			navigate(BASE_URL);
		});
	}, [clearToken]);

	const register = useCallback(
		async (userToRegister) => {
			const { data } = await axiosInstance.post(AUTH_API_REGISTER_URL, userToRegister);
			console.log(data);
			// setUser(user);
			setToken(data.access);
		},
		[setToken]
	);

	const login = useCallback(
		async (username, password) => {
			const {
				data: { access, refresh },
			} = await axiosInstance
				.post(AUTH_API_LOGIN_URL, {
					username,
					password,
				})
				.catch((error) => {
					console.log("useAuth [login]:", error);
				});
			setUser(access);
			setToken(access);
			localStorage.setItem("refresh_token", refresh);
		},
		[setToken]
	);

	async function refreshToken() {
		const refresh = localStorage.getItem("refresh_token");
		if (refresh) {
			const {
				data: { access },
			} = await axiosInstance
				.post(AUTH_API_REFRESH_TOKEN_URL, {
					refresh,
				})
				.catch((error) => {
					console.log("useAuth [refreshToken]:", error);
				});
			setUser(access);
			console.log("useAuth: User is set", access);
			setToken(access);
		} else {
			console.log("useAuth [refreshToken]: refresh token is not set");
		}
	}

	return {
		user,
		setUser,
		register,
		login,
		logout,
		handleTokenExpiration,
		refreshToken,
	};
}

export default useAuth;


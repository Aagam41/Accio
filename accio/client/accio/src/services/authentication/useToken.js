import { useRef, useCallback, useEffect } from "react";
import useTokenExpiration from "./useTokenExpiration";
import {
	AUTH_API_AUTHORIZATION_HEADER,
	AUTH_API_BASE_URL,
	AUTH_API_LOGIN_URL,
	AUTH_API_LOGOUT_URL,
	AUTH_API_REFRESH_TOKEN_URL,
	AUTH_API_REGISTER_URL,
	BASE_URL,
} from "config";
import axios from "axios";
import { configure } from "axios-hooks";

const axiosInstance = axios.create({
	baseURL: AUTH_API_BASE_URL,
});

function useToken(handleTokenInvalidation, handleTokenExpiration) {
	const tokenRef = useRef();
	const { clearRefreshTimeout, setTokenExpiration } = useTokenExpiration(handleTokenExpiration);

	const setToken = useCallback(
		(access_token) => {
			tokenRef.current = access_token;
			// const expirationDate = new Date(token_expiration);
			// setTokenExpiration(expirationDate);
		},
		[setTokenExpiration]
	);

	const tokenExists = useCallback(() => {
		return !!tokenRef.current;
	}, []);

	const clearToken = useCallback(
		(shouldClearCookie = true) => {
			const clearRefreshTokenCookie = shouldClearCookie ? axiosInstance.get("logout") : Promise.resolve();
			return clearRefreshTokenCookie.finally(() => {
				tokenRef.current = undefined;
				clearRefreshTimeout();
			});
		},
		[clearRefreshTimeout]
	);

	useEffect(() => {
		axiosInstance.interceptors.request.use((config) => {
			config.headers.authorization = `${AUTH_API_AUTHORIZATION_HEADER} ${tokenRef.current}`;
			return config;
		});

		axiosInstance.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.status === 401 && tokenRef.current) {
					clearToken();
					handleTokenInvalidation();
				}
				return Promise.reject(error);
			}
		);

		configure({ axiosInstance });
	}, [clearToken, handleTokenInvalidation]);

	return {
		clearToken,
		setToken,
		tokenExists,
	};
}

export default useToken;
export { axiosInstance };


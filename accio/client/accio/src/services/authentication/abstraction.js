import { toast } from "react-toastify";

export function registerHandleResponseError(error) {
	const httpRespStatus = error.response.status;
	if (httpRespStatus >= 500) {
		toast.warning("Something happend on our side. Please try again later", {
			toastId: "useauth_server_error_response",
			icon: "😰",
			externalTheme: "dark",
			containerId: "auth-toastify-container",
		});
	} else if (httpRespStatus >= 400) {
		toast.error("Couldn't register the user", {
			toastId: "useauth_client_error_response",
			icon: "🦤",
			externalTheme: "dark",
			containerId: "auth-toastify-container",
		});
	}
	console.log(
		"useAuth Error [register -> error.response]:",
		error.response.status,
		error.response.data,
		error.response.headers
	);
}

export function loginHandleResponseError(error) {
	const httpRespStatus = error.response.status;
	if (httpRespStatus >= 500) {
		toast.warning("Something happend on our side. Please try again later", {
			toastId: "useauth_login_server_error_response",
			icon: "😰",
			externalTheme: "dark",
			containerId: "auth-toastify-container",
		});
	} else if (httpRespStatus >= 400) {
		toast.error("No active account found with the given credentials", {
			toastId: "useauth_login_client_error_response",
			icon: "👮‍♀️",
			externalTheme: "dark",
			containerId: "auth-toastify-container",
		});
	}
	console.log(
		"useAuth Error [login -> error.response]:",
		error.response.status,
		error.response.data,
		error.response.headers
	);
}


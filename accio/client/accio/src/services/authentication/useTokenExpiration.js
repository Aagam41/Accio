import { useEffect, useRef, useState } from "react";

function useTokenExpiration(handleTokenExpiration) {
	const refreshTimeoutRef = useRef();
	const [tokenExpiration, setTokenExpiration] = useState();

	useEffect(() => {
		if (tokenExpiration instanceof Date && !isNaN(tokenExpiration.valueOf())) {
			const currentDate = new Date();
			const expirationMiliSeconds = tokenExpiration.getTime() - currentDate.getTime();

			refreshTimeoutRef.current = window.setTimeout(async () => {
				handleTokenExpiration();
			}, expirationMiliSeconds);
		}

		return () => {
			window.clearTimeout(refreshTimeoutRef.current);
		};
	}, [handleTokenExpiration, tokenExpiration]);

	const clearRefreshTimeout = () => {
		window.clearTimeout(refreshTimeoutRef.current);
		setTokenExpiration(undefined);
	};

	return {
		clearRefreshTimeout,
		setTokenExpiration,
	};
}

export default useTokenExpiration;


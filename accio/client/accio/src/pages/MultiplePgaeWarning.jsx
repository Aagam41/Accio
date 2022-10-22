import React from "react";
import styled from "styled-components";
import { AccioBrand } from "components/brand";

const Body = styled.main`
	position: relative;
	width: 100vw;
	height: 100vh;
	padding: 1em;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MainContainer = styled.div`
	background-color: rgba(255, 255, 255, 0.13);
	width: max-content;
	border-radius: 2em;
	backdrop-filter: blur(5px);
	border: 2px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
	padding: 2em 4em;
`;

function MultiplePageWarning() {
	return (
		<Body>
			<MainContainer>
				<AccioBrand flexDirection="column" fontSize="2em"></AccioBrand>
				<h1 style={{ color: "#ffffff" }}>Ops!!! Looks like you have opened multiple pages.</h1>
				<h3 style={{ color: "#ffffff80" }}>This can lead to another dimensions.</h3>
				<h5 style={{ color: "#ffffff80" }}>Please don&lsquo;t wander off.</h5>
			</MainContainer>
		</Body>
	);
}

export default MultiplePageWarning;

import React from "react";
import styled from "styled-components";

const Text = styled.div`
	margin: auto 0.5em;
	background: -webkit-linear-gradient(top left, #eb79b9, #ffcc31, #4ecd6f);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	color: transparent;
`;

function AccioLogoText() {
	return <Text>Accio</Text>;
}

export default AccioLogoText;


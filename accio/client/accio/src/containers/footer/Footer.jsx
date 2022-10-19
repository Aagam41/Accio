import React from "react";
import styled from "styled-components";

const FooterContainer = styled.aside`
	position: relative;
	background: -webkit-linear-gradient(left, #12b54b, #3872bf, #5c4a34, #ffcc31, #ff79e2);
	height: 2em;
	width: 100vw;
	top: 0;
	bottom: calc(2em + 50px - 100vh);
	color: transparent;
	text-shadow: 0 0 1px #f5f5f5f0;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
`;

function Footer() {
	return (
		<FooterContainer>
			<div>Aagam H. Sheth [211430142503]</div>
			<div>Bhargav Bhalara [211430142501]</div>
			<div>Jenil Katudia [201430142044]</div>
		</FooterContainer>
	);
}

export default Footer;


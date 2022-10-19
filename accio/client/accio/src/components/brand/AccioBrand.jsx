import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AccioLogoWizard from "./AccioLogoWizard";
import AccioLogoText from "./AccioLogoText";

AccioBrand.propTypes = {
	flexDirection: PropTypes.string,
	justifyContent: PropTypes.string,
	alignItems: PropTypes.string,
	fontSize: PropTypes.string,
};

const BrandContainer = styled.div`
	display: flex;
	flex-direction: ${(props) => props.flexDirection || "row"};
	justify-content: ${(props) => props.justifyContent || "space-around"};
	align-items: ${(props) => props.alignItems || "center"};
	flex-wrap: nowrap;
	font-size: ${(props) => props.fontSize || "2em"};
	font-family: "JetBrains Mono";
	font-weight: 900;
	margin: auto 2em;
	cursor: pointer;
`;

function AccioBrand({ flexDirection, justifyContent, alignItems, fontSize }) {
	return (
		<BrandContainer
			flexDirection={flexDirection}
			justifyContent={justifyContent}
			alignItems={alignItems}
			fontSize={fontSize}
		>
			<AccioLogoWizard />
			<AccioLogoText />
		</BrandContainer>
	);
}

export default AccioBrand;


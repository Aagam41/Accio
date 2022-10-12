import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

Header.propTypes = {
	children: PropTypes.element.isRequired,
	href: PropTypes.string.isRequired,
};

const HeaderContainer = styled.header`
	display: flex;
	position: relative;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex-wrap: nowrap;
	background: #f5f5f5cc;
	padding: auto 1em;
	z-index: 1;
	&:before {
		content: '';
		display: block;
		position: absolute;
		top: 50px;
		left: 0;
		right: 0;
		bottom: -4px;
		z-index: 1;
		background: linear-gradient(#00000020, #00000000);
	}
`;

const HeaderSearchBar = styled.input`
	padding: 7px 4em;
	margin: 8px 2em;
	font-size: 14px;
	width: 100%;
	border: 1px solid #c5c5c5;
	box-shadow: inset 1px 2px 4px #c5c5c5ff;
	border-radius: 10px;
	background: white
		url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"  font-size="4em"><text y="75%">🔍️</text></svg>')
		no-repeat 1em center;
	caret-color: mediumseagreen;
	color: #000000aa;
	&:focus {
		border: 1px solid #a5a5a5;
		outline: none;
	}
	&::placeholder {
		color: #00000077;
	}
`;

const Brand = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	flex-wrap: nowrap;
	font-size: 2em;
	font-family: 'JetBrains Mono';
	font-weight: 900;
	margin: auto 2em;
	cursor: pointer;
`;

const AccioLogo = styled.div``;

const AccioLogoText = styled.div`
	margin: auto 0.5em;
	background: -webkit-linear-gradient(top left, #eb79b9, #ffcc31, #4ecd6f);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	color: transparent;
`;

const Menu = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: auto 2em;
`;

const MenuOption = styled.a`
	margin: auto 0.5em;
	font-size: 2em;
	cursor: pointer;
	/* cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 100 100"><text y="50%" font-size="4em">👆️</text></svg>')
						16 0,
					auto; */
	text-decoration: none;
`;

function Header() {
	return (
		<HeaderContainer>
			<Brand>
				<AccioLogo>🧙‍♂️</AccioLogo>
				<AccioLogoText>Accio</AccioLogoText>
			</Brand>

			<HeaderSearchBar placeholder="Search for tags, types, folders and documents" type="text" />

			<Menu>
				<MenuOption href="#">🕵️</MenuOption>
				<MenuOption href="#">📥️</MenuOption>
				<MenuOption href="#">📖</MenuOption>
				<MenuOption href="#">🧔</MenuOption>
			</Menu>
		</HeaderContainer>
	);
}

export default Header;


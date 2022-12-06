import React from "react";
import styled from "styled-components";
import DocumentTable from "./Table";

const MainContainer = styled.header`
	padding: 2em;
	background-color: #ffffff;
	min-height: calc(100% - 50px - 2em);
	max-height: calc(100% - 50px + 3em);
	border-radius: 1em;
	border: 1px solid #00000077;
	z-index: 1;
	box-shadow: 0px 0px 5px 1px #00000020;
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
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
	font-size: 1.5em;
	cursor: pointer;
	/* cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 100 100"><text y="50%" font-size="4em">👆️</text></svg>')
						16 0,
					auto; */
	text-decoration: none;
`;

const ContainerBody = styled.div`
	height: 500px;
	padding: 0 10px 10px 10px;
	overflow: scroll;
`;

function Main() {
	return (
		<MainContainer>
			<Header>
				<div>
					<h1>🌏️ Root</h1>
					<span>root</span>
				</div>
				<Menu>
					<MenuOption>⚙️</MenuOption>
					<MenuOption>🧑‍⚖️</MenuOption>
					<MenuOption>📂</MenuOption>
					<MenuOption>🪟</MenuOption>
				</Menu>
			</Header>
			<ContainerBody>
				<DocumentTable />
			</ContainerBody>
		</MainContainer>
	);
}

export default Main;


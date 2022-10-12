import React from 'react';
import Header from 'containers/header';
import Aside from 'containers/aside';
import Footer from 'containers/footer';
import styled from 'styled-components';
import Main from 'containers/main';
import Dropzone from 'containers/dropzone';

const AppContainer = styled.div`
	position: relative;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	border: none;
`;

const Body = styled.main`
	background: #ebebeb80;
	position: relative;
	left: 360px;
	width: calc(100% - 360px);
	height: calc(100% - 50px - 2em);
	padding: 1em;
`;

function App() {
	return (
		<AppContainer>
			<Header></Header>
			<Aside></Aside>
			<Body>
				<Dropzone></Dropzone>
				<Main></Main>
			</Body>
			<Footer />
		</AppContainer>
	);
}

export default App;


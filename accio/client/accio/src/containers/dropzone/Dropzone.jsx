import React, { useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";

const StyledDropzone = styled.div`
	margin: 0;
	padding: 0;
	margin-bottom: 1em;
	background-color: #ffffff;
	height: 50px;
	border-radius: 10px;
	border: 2px solid #00000066;
	z-index: 1;
	background: -webkit-linear-gradient(right, #bd1b5866, #3c467066, #4527fd66, #4db67b66, #16130b66);
	color: white;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Modal = styled(ReactModal)`
	position: absolute;
	top: calc((100vh - 80%) / 2);
	left: calc((100vw - 80%) / 2);
	width: 80%;
	height: 80%;
	background-color: white;
	box-shadow: 0 0 2em 4px #bebebe;
	border-radius: 1em;
	padding: 2em;
	.overlay {
		background-color: transparent;
	}
`;

function Dropzone() {
	const [showModal, hideModal] = useModal(() => {
		Modal.setAppElement("#root");
		return (
			<Modal isOpen overlayClassName="overlay">
				<p>Modal content</p>
				<button onClick={hideModal}>Hide modal</button>
			</Modal>
		);
	});

	const onDrop = useCallback((acceptedFiles) => {
		acceptedFiles.forEach((file) => {
			showModal();
			// const reader = new FileReader();

			// reader.onabort = () => console.log("file reading was aborted");
			// reader.onerror = () => console.log("file reading has failed");
			// reader.onload = () => {
			// 	// Do whatever you want with the file contents
			// 	const binaryStr = reader.result;
			// 	console.log(binaryStr);
			// };
			// reader.readAsArrayBuffer(file);
			console.log(file);
		});
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop, noKeyboard: true });

	return (
		<section className="container">
			<StyledDropzone {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<p>⬆️ Drag {"&"} drop your files to upload</p>
			</StyledDropzone>
		</section>
	);
}

export default Dropzone;


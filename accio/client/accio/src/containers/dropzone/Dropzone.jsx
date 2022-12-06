import React, { useCallback, useContext, useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import axios from "axios";
import { DOCUMENT_STORAGE_API_BASE_URL } from "config";
import { AuthContext, useAuth } from "services/authentication";

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
	const { user } = useContext(AuthContext);
	const [isModelOpen, setModelOpen] = useState(false);
	Modal.setAppElement("#root");
	const openModal = () => setModelOpen(true);
	const hideModal = () => setModelOpen(false);

	const onDrop = useCallback((acceptedFiles) => {
		openModal();
		console.log(acceptedFiles);
		acceptedFiles.forEach((file) => {
			console.log(file);
			const formData = new FormData();
			formData.append("document", file);
			formData.append("path", file.path);
			formData.append("last_modified", new Date(file.lastModified).toISOString());
			formData.append("name", file.name);
			formData.append("size", file.size);
			formData.append("mime_type", file.size);
			formData.append("upload_datetime", new Date().toISOString());
			formData.append("user", user.username);

			axios.post(`${DOCUMENT_STORAGE_API_BASE_URL}/document/`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
		});
	}, []);

	const { acceptedFiles, fileRejections, isDragActive, getRootProps, getInputProps } = useDropzone({
		onDrop,
		noKeyboard: true,
	});

	return (
		<section className="container">
			<StyledDropzone {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<p>{isDragActive ? "Drop your files here 🔽" : "⬆️ Drag & drop your files to upload"}</p>
			</StyledDropzone>

			<Modal isOpen={isModelOpen} overlayClassName="overlay">
				<p>Modal content</p>
				<button onClick={hideModal}>Hide modal</button>
				{acceptedFiles.map((file) => {
					return (
						<div key={file.name}>
							<h4>{file.name}</h4>
							<h6>{file.path}</h6>
						</div>
					);
				})}
			</Modal>
		</section>
	);
}

export default Dropzone;


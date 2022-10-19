import React from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

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

function Dropzone() {
	const { getRootProps, getInputProps } = useDropzone({ noKeyboard: true });

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


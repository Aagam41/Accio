import React, { useContext, useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { AccioBrand } from "components/brand";
import { AuthContext } from "services/authentication";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Body = styled.main`
	background-color: #000000;
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
	backdrop-filter: blur(10px);
	border: 2px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
	padding: 2em 4em;
`;

const FormElementContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin: 1em;
`;

const Label = styled.label`
	min-width: max-content;
	display: block;
	margin: 2px;
	color: ${(props) => (props.isInvalid ? "#ff0000" : "#ffffffaa")};
	font-size: 1em;
	font-weight: 500;
`;

const Input = styled.input`
	width: 100%;
	background-color: rgba(255, 255, 255, 0.07);
	border-radius: 1em;
	padding: 1em 1em;
	font-size: 14px;
	font-weight: 300;
	border: ${(props) => (props.isInvalid ? "1px solid #ff000088" : "none")};
	color: #ffffff;
	&:focus {
		outline: none;
	}
`;

const ErrorMessage = styled.div`
	width: 100%;
	font-size: 0.8em;
	color: #ff3333;
	margin: 4px;
	text-align: right;
`;

const SubmitButton = styled.button`
	color: #ffffff;
	font-weight: 900;
	width: 80%;
	border-radius: 1em;
	border: none;
	padding: 1em;
	margin: 4em;
	background: -webkit-linear-gradient(-45deg, #12b54b, #3872bf, #5c4a34, #ffcc31, #ff79e2);
	cursor: pointer;
`;

const TextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	const [isInvalid, setIsInvalid] = useState(false);

	useEffect(() => setIsInvalid(meta.touched && meta.error), [meta]);

	return (
		<FormElementContainer>
			<Label htmlFor={props.id || props.name} isInvalid={isInvalid}>
				{label}
			</Label>
			<Input {...field} {...props} isInvalid={isInvalid} />
			{meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : null}
		</FormElementContainer>
	);
};

function Login() {
	const navigate = useNavigate();
	const { user, login } = useContext(AuthContext);
	const navigateAfterLogin = () => {
		user && navigate("/");
	};

	useEffect(navigateAfterLogin, [user]);

	return (
		<>
			<Body>
				<Formik
					initialValues={{ username: "", password: "" }}
					validationSchema={Yup.object({
						username: Yup.string().max(30, "Must be 30 characters or less").required("Required"),
						password: Yup.string().min(1, "Must be 8 characters or more").required("Required"),
					})}
					onSubmit={({ username, password }, { setSubmitting }) => {
						setSubmitting(false);
						login(username, password);
						toast.error("No active account found with the given credentials", {
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							newestOnTop: false,
							closeOnClick: false,
							rtl: false,
							pauseOnFocusLoss: true,
							draggable: false,
							pauseOnHover: true,
							theme: "colored",
							progress: undefined,
							icon: "🦖",
						});
						navigateAfterLogin();
					}}
				>
					{({ errors, touched }) => (
						<MainContainer>
							<Form>
								<AccioBrand flexDirection="column" fontSize="4em"></AccioBrand>
								<TextInput label="Username" name="username" type="text" placeholder="Jenil44" />
								<TextInput label="Password" name="password" type="password" placeholder="shush!! it's a secret" />
								<SubmitButton type="submit">Login</SubmitButton>
							</Form>
						</MainContainer>
					)}
				</Formik>
			</Body>
		</>
	);
}

export default Login;


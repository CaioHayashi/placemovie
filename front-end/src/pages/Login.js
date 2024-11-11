import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import banner from "../assets/banner_login.png";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Logo } from "../components/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
	const { signIn } = useAuth(); // Obtém a função signIn do contexto
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [errorMessage, setErrorMessage] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const res = await signIn({ email, password });

			if (res === true) {
				navigate("/");
			}
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Page
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			<ContainerForm onSubmit={handleLogin}>
				<h1 style={{ color: "var(--tertiary)" }}>
					Já tem cadastro? Digite seu email e senha{" "}
				</h1>

				<ContainerInput>
					<label>Email:</label>
					<Input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Digite seu email"
					/>
				</ContainerInput>
				<ContainerInput>
					<label>Senha:</label>
					<Input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Digite sua senha"
					/>
				</ContainerInput>
				<Button type="submit">ENTRAR</Button>
			</ContainerForm>

			<ContainerBanner>
				<Logo width={"200px"} />
				<TextBanner>
					Faça login e continue explorando o
					universo dos filmes que você ama!
				</TextBanner>

				<p>
					ainda não é cadastrado?{" "}
					<NavLink
						to="/register"
						style={{ color: "var(--secondary)" }}
					>
						clique aqui
					</NavLink>
				</p>
			</ContainerBanner>
		</Page>
	);
};

const Page = styled(motion.div)`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	flex-wrap: wrap;

	background-image: url(${banner});
	background-size: cover;
	background-position: center center;
	color: white;
`;

const ContainerForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;
	width: 400px;
	border-radius: 20px;
	justify-content: center;
	margin: 5%;
`;

const ContainerBanner = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	max-width: 600px;
	margin: 5%;
`;

const ContainerInput = styled.div`
	width: 100%;
`;

const TextBanner = styled.h1`
	margin-top: 30px;
	color: var(--quaternary);
	font-size: 32px;
	font-weight: normal;
`;

export default Login;

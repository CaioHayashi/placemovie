import styled from "styled-components";
import banner from "../assets/banner_login.png";
import { Logo } from "../components/Logo";
import { Input } from "../components/Input";
import { useState } from "react";
import { Button } from "../components/Button";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/backend";
import { useAuth } from "../hooks/useAuth";

export const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navegate = useNavigate();
	const { signIn } = useAuth();

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const res = await api.post("/users", { name, email, password });
			console.log("Usuário criado:", res.data); // Verifique os dados retornados

			if (res.status === 200 || res.status === 201) {
				console.log(email, password);
				await signIn({ email, password });

				navegate("/");
			}
		} catch (error) {
			console.error(
				"Erro ao registrar usuário:",
				error.response ? error.response.data : error
			);
		}
	};

	return (
		<Page
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			<ContainerBanner>
				<Logo width={"200px"} />
				<TextBanner>
					Yorem ipsum dolor sit amet, consectetur adipiscing elit.
				</TextBanner>
			</ContainerBanner>

			<ContainerForm onSubmit={handleRegister}>
				<h1 style={{ color: "var(--quaternary)" }}>
					Não tem cadastro? Digite nome, email e senha
				</h1>
				<ContainerInput>
					<label>Nome:</label>
					<Input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Digite seu nome"
					/>
				</ContainerInput>

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
				<Button type="submit">Cadastrar</Button>

				{/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
				<p>
					Já é cadastrado?{" "}
					<NavLink to="/login" style={{ color: "var(--secondary)" }}>
						clique aqui
					</NavLink>
				</p>
			</ContainerForm>
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
	padding: 20px;
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
	font-size: 48px;
	font-weight: bolder;
`;

import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import api from "../../api/backend";
import { useNavigate } from "react-router-dom";

export const Details = ({ user }) => {
  const navigate = useNavigate()
	const [username, setUsername] = useState(user.username);
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const handleSubmitUser = async (e) => {
		e.preventDefault();

    const response = await api.put("/users", {username, email: user.email, oldPassword, newPassword})
    console.log(response.data)
		console.log(username, user.email, oldPassword, newPassword);
    navigate("/")
	};

	return (
		<Container>
			<div style={{ maxWidth: "500px", padding: "20px 0px" }}>
				<Title>
					<Label>Editar</Label> Perfil
				</Title>
				<Subtitle>
					Atualize suas informações para manter seu perfil sempre
					completo e atualizado.
				</Subtitle>
			</div>
			<ContainerForm onSubmit={handleSubmitUser}>
				<ContainerInput>
					<label>username</label>
					<Input
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Digite um novo username"
						value={username}
					/>
				</ContainerInput>

				<ContainerInput>
					<label>senha</label>
					<Input
						onChange={(e) => setOldPassword(e.target.value)}
						placeholder="Digite sua senha"
					/>
				</ContainerInput>

				<ContainerInput>
					<label>nova senha</label>
					<Input
						onChange={(e) => setNewPassword(e.target.value)}
						placeholder="Digite sua nova senha"
					/>
				</ContainerInput>
				<Button type="submit">Alterar</Button>
			</ContainerForm>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Title = styled.h1`
	padding: 20px 0;
	font-size: 2rem;
	font-weight: 600;
`;

const Subtitle = styled.h2`
	font-size: 1.5;
	font-weight: 300;
`;

const Label = styled.label`
	color: var(--secondary);
`;

const ContainerForm = styled(motion.form)`
	padding: 12px;
	display: flex;
	flex-direction: column;

	width: 100%; /* Garante que ocupe 100% da largura do contêiner pai */
	max-width: 500px; /* Define um tamanho máximo para telas grandes */
	/* background-color: #ffffff10;
	border-radius: 14px; */
	/* box-shadow: 0 5px 5px 10px #00000020; */
`;

const ContainerInput = styled.div`
	margin-bottom: 20px;
	width: 100%;
`;

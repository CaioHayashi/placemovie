import React, { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../api/backend";
import { useNavigate } from "react-router-dom"; // Importar o useNavigate
import { useAuth } from "../hooks/useAuth";
import { Button } from "./Button";
import { formatDate } from "../util/formatDate";
import { motion } from "framer-motion";

export const Comments = ({ movieId }) => {
	const { user } = useAuth(); // Obtendo o usuário logado
	const [comments, setComments] = useState([]);
	const [content, setContent] = useState(""); // Estado para o conteúdo do comentário
	const navigate = useNavigate(); // Hook para navegação

	// Função para buscar os comentários
	// Função para enviar um comentário
	const handleCommentSubmit = async (e) => {
		e.preventDefault();

		// Verificar se o usuário está logado antes de enviar o comentário
		if (!user) {
			alert("Você precisa estar logado para comentar!");
			return;
		}

		try {
			// Envia o comentário
			await api.post("/comments", {
				content,
				id_user: user.id,
				id_movie_ref: movieId
			});

			// Limpa o campo de texto
			setContent("");

			// Atualiza a lista de comentários com um novo GET
			await fetchComments();
		} catch (error) {
			console.error("Erro ao enviar comentário:", error);
		}
	};

	// Função para buscar comentários
	const fetchComments = async () => {
		try {
			const response = await api.get(`/comments?id_movie_ref=${movieId}`);
			setComments(response.data.comments); // Atualiza a lista de comentários
		} catch (error) {
			console.error("Erro ao buscar comentários:", error);
		}
	};

	// Chame fetchComments no useEffect para carregar os comentários inicialmente
	useEffect(() => {
		fetchComments();
	}, [movieId]);

	// Função para redirecionar para a página de login
	const handleLoginRedirect = () => {
		navigate("/login"); // Navega para a página de login
	};

	return (
		<Container>
			<h1>Comentários</h1>

			{/* Se o usuário não estiver logado, exibe a mensagem e o botão para login */}
			{!user && (
				<Alert>
					Você precisa estar logado para comentar.
					<Button width="fit-content" onClick={handleLoginRedirect}>
						Ir para o login
					</Button>
				</Alert>
			)}

			<Content>
				{/* Formulário de comentários visível para todos */}
				<ContainerSubmit>
					<TextArea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Comente sobre o filme!"
						disabled={!user} // Desabilita o campo se o usuário não estiver logado
					/>

					<Button
						width="fit-content"
						onClick={handleCommentSubmit}
						disabled={!user}
					>
						Enviar
					</Button>
				</ContainerSubmit>

				{comments?.length ? (
					<ScrollableContainer>
						{comments?.map((comment, i) => (
							<Comment
								key={comment?.id}
								initial={{ opacity: 0, x: -20 }} // Estado inicial
								animate={{ opacity: 1, x: 0 }} // Estado final
								exit={{ opacity: 0, x: 20 }} // Estado ao sair
								transition={{ duration: 0.5 }} // Duração da animação
							>
								<HeaderComment>
									<label>@{comment?.users.username}</label>
									{formatDate(comment?.created_at)}
								</HeaderComment>
								<p style={{ padding: "12px" }}>
									{comment?.content}
								</p>
							</Comment>
						))}
					</ScrollableContainer>
				) : (
					<NotComments>ainda não há comentários</NotComments>
				)}
			</Content>
		</Container>
	);
};

// Estilos

const Container = styled.div`
	margin: auto;
	padding: 5% 10%;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 50px;
	flex-wrap: wrap;
`;

const ContainerSubmit = styled.div`
	flex: 1 1 500px;
`;

const TextArea = styled.textarea`
	margin-bottom: 20px;
	width: 100%;
	height: 200px;
	background-color: #ffffff15;
	border-radius: 14px;
	padding: 12px;
	border: 2px solid #ccc;
	color: white;
`;

const Comment = styled(motion.div)`
	display: flex;
	flex-direction: column;
	font-size: 12px;
	min-height: 100px;
	background-color: #ffffff15;
	margin-top: 4px;
	color: white;
	border-radius: 4px;
	overflow: hidden;
	margin-bottom: 20px;
`;

const HeaderComment = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 4px 12px;
	font-size: 12px;
	background-color: var(--grayDark);
	font-weight: bold;
	color: var(--quarternary);
`;

const ScrollableContainer = styled.div`
	flex: 2 1 500px;
	overflow-y: auto;
	height: 500px;
`;

const Alert = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 20px;
	padding: 10px;
	background-color: var(--quaternary-t);
	color: var(--quaternary);
	border-radius: 5px;
	margin-bottom: 20px;
`;

// const Button = styled.button`
// 	background-color: #007bff;
// 	color: white;
// 	border: none;
// 	padding: 10px 20px;
// 	border-radius: 4px;
// 	cursor: pointer;
// 	margin-top: 10px;
// 	&:hover {
// 		background-color: #0056b3;
// 	}
// `;

const NotComments = styled.p`
	text-align: center;
	flex: 2 1 500px;
	color: var(--quaternary);
`;

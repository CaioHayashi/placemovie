import React, { useState, useEffect } from "react";
import api from "../api/backend";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import styled from "styled-components";

const LikeButton = ({ movieId, userId, disabled }) => {
	const [liked, setLiked] = useState(false); // Estado para saber se o filme está curtido

	// Função para alternar o like
	const handleToggleLike = async () => {
		try {
			const response = await api.post("/likes", {
				movieId,
				userId
			});

			setLiked(response.data.liked);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchLike = async () => {
		try {
			const response = await api.get("/likes", {
				params: { movieId, userId }
			});

			// Define o estado 'liked' conforme a resposta da API
			setLiked(response.data.liked);
		} catch (error) {
			console.log("Erro ao buscar status do like:", error);
		}
	};

	useEffect(() => {
		fetchLike();
	}, []);

	return (
		<Container onClick={handleToggleLike} disabled={disabled}>
			{liked ? (
				<IoHeartSharp size={48} color={"var(--secondary)"} />
			) : (
				<>
					<IoHeartOutline size={48} color="white" />
				</>
			)}
		</Container>
	);
};

const Container = styled.button`
	width: fit-content;
	background-color: transparent;
`;

export default LikeButton;

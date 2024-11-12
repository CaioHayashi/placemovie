import React, { useState, useEffect } from "react";
import api from "../api/backend";
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import styled from "styled-components";

const LikeMovieButton = ({ movieId, userId, disabled }) => {
	const [liked, setLiked] = useState(false); // Estado para saber se o filme está curtido

	// Função para alternar o like
	const handleToggleLike = async () => {
		try {
			const response = await api.post("/likes/movies", {
				movieId,
				userId
			});

			setLiked(response.data.liked);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchLike = async () => {
			try {
				const response = await api.get("/likes/movies", {
					params: { movieId, userId }
				});

				// Define o estado 'liked' conforme a resposta da API
				setLiked(response.data.liked);
			} catch (error) {
				console.log("Erro ao buscar status do like:", error);
			}
		};

		fetchLike();
	}, [movieId, userId]);

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
	cursor: pointer;
	width: fit-content;
	transition: all 0.3s;
	background-color: transparent;
	filter: drop-shadow(0 0 10px var(--secondary));
	&:hover {
		scale: 1.2;
	}
`;

export default LikeMovieButton;

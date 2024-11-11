import React, { useEffect, useState } from "react";
import api from "../../api/backend";
import axios from "axios";

const apiKey = "YOUR_TMDB_API_KEY"; // Substitua com sua chave da TMDB

// Função para buscar detalhes dos filmes
const getMoviesByIds = async (movieIds) => {
	try {
		const response = await axios.get(`https://api.themoviedb.org/3/movie`, {
			params: {
				api_key: apiKey,
				ids: movieIds.join(",") // Passa os IDs como uma string separada por vírgulas
			}
		});
		return response.data; // Retorna os dados completos dos filmes
	} catch (error) {
		console.error("Erro ao buscar filmes:", error);
	}
};

export const LikesList = ({ user }) => {
	const [likesList, setLikesList] = useState([]);
	const [moviesDetails, setMoviesDetails] = useState([]);

	const fetchList = async () => {
		console.log(user.id);

		try {
			// Passando id_user como query parameter
			const response = await api.get(`/likes/list`, {
				params: { id_user: user.id }
			});

			const movieIds = response.data.map(
				(movie) => movie.id_movie_ref
			); // Pegue os IDs dos filmes
			const detailedMovies = await getMoviesByIds(movieIds); // Busque os detalhes dos filmes

			setMoviesDetails(detailedMovies); // Armazene os detalhes no estado
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user && user.id) {
			fetchList();
		}
	}, [user]);

	return (
		<div>
			{moviesDetails?.map((movie) => (
				<div key={movie.id}>
					<h3>{movie.title}</h3>
					<img
						src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
						alt={movie.title}
					/>
					<p>{movie.overview}</p>
				</div>
			))}
		</div>
	);
};

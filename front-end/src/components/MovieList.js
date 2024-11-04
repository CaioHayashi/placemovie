// src/components/MoviesList.js

import React, { useEffect, useState } from "react";
import tmdbApi from "../api/tmdb";
import styled from "styled-components";

const MovieList = () => {
	const [movies, setMovies] = useState([]);
	const imageBaseUrl = "https://image.tmdb.org/t/p/w200";

	useEffect(() => {
		const getPopularMovies = async (page = 1) => {
			try {
				const response = await tmdbApi.get("/movie/popular", {
					params: {
                        page,
						language: "pt-BR"
					}
				});
				setMovies(response.data.results);
			} catch (error) {
				console.error(
					"Erro ao buscar filmes populares:",
					error.response?.data || error.message
				);
				return [];
			}
		};

		getPopularMovies();
	}, []);

	return (
		<>
			<h1>Filmes Populares</h1>
			<Grid>
				{movies.map((movie) => (
					<div key={movie.id}>
						<img
							src={`${imageBaseUrl}${movie.poster_path}`}
							alt={movie.title}
							style={{ borderRadius: "14px" }}
						/>
					</div>
				))}
			</Grid>
		</>
	);
};

export default MovieList;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	align-self: center;
	gap: 16px;
`;

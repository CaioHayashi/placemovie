import tmdbApi from "../api/tmdb";

export const getMovies = async (page = 1, search) => {
	try {
		// Se houver uma pesquisa, utiliza a rota de pesquisa
		const response = search
			? await tmdbApi.get("/search/movie", {
					// Rota de pesquisa
					params: {
						page,
						query: search, // Parâmetro de consulta
						language: "pt-BR"
					}
			  })
			: await tmdbApi.get("/movie/popular", {
					// Rota de filmes populares
					params: {
						page,
						language: "pt-BR"
					}
			  });
		return response.data.results;
	} catch (error) {
		console.error(
			"Erro ao buscar filmes",
			error.response?.data || error.message
		);
		return [];
	}
};

export const getMovieDetails = async (id) => {
	try {
		const response = await tmdbApi.get(`/movie/${id}`, {
			params: {
				append_to_response: "videos,watch/providers",
				language: "pt-BR"
			}
		});
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar detalhes do filme:", error);
		return null;
	}
};

// Função para buscar séries populares
export const getPopularSeries = async () => {
	try {
		const response = await tmdbApi.get("/tv/popular");
		return response.data.results;
	} catch (error) {
		console.error(
			"Erro ao buscar séries populares:",
			error.response?.data || error.message
		);
		return [];
	}
};

export const getTrendings = async () => {
	try {
		const response = await tmdbApi.get("/trending/movie/week", {
			params: {
				language: "pt-BR"
			}
		});
		return response.data.results.slice(0, 5);
	} catch (error) {
		console.error(
			"Erro ao buscar trendings:",
			error.response?.data || error.message
		);
	}
};

export const getTopRated = async () => {
	try {
		const response = await tmdbApi.get("/movie/top_rated", {
			params: {
				language: "pt-BR"
			}
		});
		return response.data.results.slice(0, 5); // Pega os 5 mais bem avaliados
	} catch (error) {
		console.error(
			"Erro ao buscar top rated:",
			error.response?.data || error.message
		);
	}
};

export const getMoviesByGenre = async (genreId) => {
	try {
		const response = await tmdbApi.get("/discover/movie", {
			params: {
				with_genres: genreId, // Gênero de terror (ID 27)
				sort_by: "popularity.desc", // Ordenando pelos mais populares
				language: "pt-BR"
			}
		});
		return response.data.results.slice(0, 5); // Limita os 5 primeiros resultados
	} catch (error) {
		console.error(
			"Erro ao buscar filmes de terror:",
			error.response?.data || error.message
		);
	}
};

export const getMoviesById = async (moviesIds) => {
	try {
		const response = await tmdbApi.get("/discover/movie", {
			params: {
				with_ids: moviesIds, // Gênero de terror (ID 27)
				sort_by: "popularity.desc", // Ordenando pelos mais populares
				language: "pt-BR"
			}
		});
		return response.data.results; // Limita os 5 primeiros resultados
	} catch (error) {
		console.error(
			"Erro ao buscar filmes de terror:",
			error.response?.data || error.message
		);
	}
};


// export const getMoviesByIds = async (movieIds) => {
// 	try {
// 		const response = await tmdbApi.get("/movies", {
// 			params: {
// 				api_key: "8d7080dff33cefafcdbfaa4d90d95064",
// 				language: "pt-BR", // Idioma para a resposta
// 				width_ids: movieIds.join(",") // Passando os IDs dos filmes como string separada por vírgulas
// 			}
// 		});
// 		return response.data; // Retorna os dados dos filmes
// 	} catch (error) {
// 		console.error("Erro ao buscar filmes:", error);
// 		return [];
// 	}
// };


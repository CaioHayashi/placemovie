import tmdbApi from "../../api/tmdb";

export const getMovies = async (page = 1, search, selectedGenre) => {
	console.log(page, search, selectedGenre)

	if(selectedGenre) {
		const response = await tmdbApi.get("/discover/movie", {
			params: {
				with_genres: selectedGenre,
				language: "pt-BR"
			}
		});

		return response.data.results;
	}

	try {
		// Se houver uma pesquisa, utiliza a rota de pesquis

		const response = search
			? await tmdbApi.get("/search/movie", {
					// Rota de pesquisa
					params: {
						page,
						query: search,
						language: "pt-BR"
					}
			  })
			: await tmdbApi.get("/movie/popular", {
					// Rota de filmes populares
					params: {
						page,
						region: "BR",
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

export const getGenres = async () => {
	const response = await tmdbApi.get(
		`https://api.themoviedb.org/3/genre/movie/list?`,
		{
			params: {
				language: "pt-BR"
			}
		}
	);

	return response.data.genres; // Retorna uma lista de gêneros com id e nome
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

export const getMoviesByIds = async (moviesId) => {
	try {
		const resquests = moviesId.map(async (movie) => {
			const response = await tmdbApi
				.get(`/movie/${movie}?`, {
					params: {
						language: "pt-BR",
						append_to_response: "videos,watch/providers"
					}
				});
			return response.data;
		});

		const moviesData = await Promise.all(resquests);
		return moviesData; // Retorna os dados dos filmes
	} catch (error) {
		console.error("Erro ao buscar filmes:", error);
		return [];
	}
};


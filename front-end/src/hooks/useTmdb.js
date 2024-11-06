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

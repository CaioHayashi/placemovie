import tmdbApi from "../../api/tmdb";

export const getSeries = async (page = 1, search, selectedGenre) => {
	console.log(selectedGenre, search);

	if (selectedGenre) {
		const response = await tmdbApi.get("/discover/tv", {
			params: {
				with_genres: selectedGenre,
				language: "pt-BR"
			}
		});

		return response.data.results;
	}

	try {
		// Se houver uma pesquisa, utiliza a rota de pesquisa para séries
		const response = search
			? await tmdbApi.get("/search/tv", {
					// Rota de pesquisa para séries
					params: {
						page,
						query: search,
						language: "pt-BR"
					}
			  })
			: await tmdbApi.get("/tv/popular", {
					// Rota de séries populares
					params: {
						page,
						region: "BR",
						language: "pt-BR"
					}
			  });

		return response.data.results;
	} catch (error) {
		console.error(
			"Erro ao buscar séries",
			error.response?.data || error.message
		);
		return [];
	}
};

export const getSeriesDetails = async (id) => {
	try {
		const response = await tmdbApi.get(`/tv/${id}`, {
			params: {
				append_to_response: "videos,watch/providers",
				language: "pt-BR"
			}
		});
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar detalhes da série:", error);
		return null;
	}
};

export const getSeriesByIds = async (seriesId) => {
	try {
		const resquests = seriesId.map((id) => {
			return tmdbApi
				.get(`/tv/${id}?`, {
					params: {
						language: "pt-BR",
						append_to_response: "videos,watch/providers"
					}
				})
				.then((response) => response.data);
		});

		const moviesData = await Promise.all(resquests);

		return moviesData; // Retorna os dados dos filmes
	} catch (error) {
		console.error("Erro ao buscar filmes:", error);
		return [];
	}
};
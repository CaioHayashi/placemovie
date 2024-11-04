// services/tmdbApi.js
import axios from "axios";

const tmdbApi = axios.create({
	baseURL: "https://api.themoviedb.org/3", // URL base da API do TMDB
	headers: {
		"Content-Type": "application/json"
	}
});

tmdbApi.interceptors.request.use((config) => {
	const apiKey = process.env.REACT_APP_TMDB_API_KEY;
	config.params = config.params || {};
	config.params["api_key"] = apiKey;
	return config;
});



export default tmdbApi;

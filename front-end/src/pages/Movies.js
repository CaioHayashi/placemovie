import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { getMovies } from "../hooks/useTmdb";
import { TextButton } from "../components/TextButton";
import bg from "../assets/bg-movies.png";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";

export const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);

	const imageBaseUrl = "https://image.tmdb.org/t/p/w200";
	const navigate = useNavigate();

	useEffect(() => {
		const fetchMovies = async () => {
			setLoading(true);
			const data = await getMovies(page, search);
			setMovies((prev) => [...prev, ...data]);
			setLoading(false);
		};
		fetchMovies();
	}, [page, search]);

	useEffect(() => {
		const loadPopularMovies = async () => {
			setLoading(true); // Define loading como true ao buscar filmes
			const popularMovies = await getMovies(); // Busca filmes populares
			setMovies(popularMovies); // Substitui a lista existente com os populares
			setLoading(false); // Define loading como false após a busca
		};
		loadPopularMovies();
	}, []);

	const handleMovieDetails = (id) => {
		navigate(`/movies/${id}`);
	};

	return (
		<Page
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			<BgImage src={bg} />

			<NavBar />

			<SectionSearch>
				<h1>Filmes</h1>
				<Input
					type="text"
					placeholder="Pesquise por filmes..."
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setMovies([]); // Limpa a lista ao buscar
						setPage(1); // Reseta a página para 1 ao buscar
					}}
				/>
			</SectionSearch>
			<Grid>
				{movies.map((movie) => (
					<div
						key={movie.id}
						onClick={() => handleMovieDetails(movie.id)}
					>
						<img
							src={`${imageBaseUrl}${movie.poster_path}`}
							alt={movie.title}
							style={{ borderRadius: "14px", height: "300px" }}
						/>
						<div>{movie.title}</div>
						<div>{movie.id}</div>
					</div>
				))}
			</Grid>
			<TextButton
				onClick={() => {
					setPage((prev) => prev + 1); // Carrega mais filmes
				}}
				disabled={loading}
			>
				{loading ? "Carregando..." : "Carregar Mais"}
			</TextButton>
		</Page>
	);
};

const BgImage = styled.img`
	position: fixed;
	background-position: fixed;
	width: 100vw;
	height: 100vh;
	object-fit: cover;
	z-index: -2;
	top: 0;
	left: 0;
`;

const Page = styled(motion.div)`
	display: flex;
	position: relative;
	flex-direction: column;
	min-height: 100vh;
	color: white;
	padding: 20px 5%;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(
		auto-fill,
		minmax(200px, 1fr)
	); /* Ajusta o número de colunas automaticamente */
	max-width: 1200px; /* Defina uma largura máxima */
	width: 100%; /* Garante que o grid ocupe toda a largura disponível */
	margin: 0 auto;
	justify-content: center; /* Centraliza o conteúdo horizontalmente */
	justify-items: center;
	gap: 16px;
`;

const SectionSearch = styled.section`
	max-width: 1200px; /* Defina uma largura máxima */
	padding: 40px;
	max-width: 500px;
`;

export default Movies;

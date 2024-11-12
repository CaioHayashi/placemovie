import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { TextButton } from "../components/TextButton";
import bg from "../assets/bg_series.png";
import { useNavigate } from "react-router-dom";
import NavBarLogin from "../components/NavBarLogin";
import { getSeries } from "../hooks/tmbd/useSeries";
import { getGenres } from "../hooks/tmbd/useMovie";

export const Series = () => {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [selectedGenre, setSelectedGenre] = useState("");
	const [genres, setGenres] = useState([]);

	const imageBaseUrl = "https://image.tmdb.org/t/p/w200";
	const navigate = useNavigate();

	useEffect(() => {
		const fetchSeries = async () => {
			setLoading(true);
			const data = await getSeries(page, search, selectedGenre);
			setMovies((prev) => [...prev, ...data]);
			setLoading(false);
		};
		fetchSeries();
	}, [page, search, selectedGenre]);

	useEffect(() => {
		const loadPopularSeries = async () => {
			setLoading(true); // Define loading como true ao buscar filmes

			const popularSeries = await getSeries(); // Busca filmes populares
			setMovies(popularSeries); // Substitui a lista existente com os populares

			const fetchGenres = await getGenres();
			setGenres(fetchGenres);

			setLoading(false); // Define loading como false após a busca
		};
		loadPopularSeries();
	}, []);

	const handleSerieDetails = (id) => {
		navigate(`/series/${id}`);
	};

	return (
		<Page
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			<NavBarLogin />
			<BgImage src={bg} />

			<NavBar />

			<SectionSearch>
				<InputSearch
					type="text"
					placeholder="Pesquise por filmes..."
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setSelectedGenre("");
						setMovies([]); // Limpa a lista ao buscar
						setPage(1); // Reseta a página para 1 ao buscar
					}}
				/>

				<label>OU</label>

				<CustomSelect
					value={selectedGenre}
					onChange={(e) => {
						setSelectedGenre(Number(e.target.value));
						setSearch("");
						setMovies([]);
						setPage(1);
					}}
				>
					<option value="">Selecione um gênero</option>
					{genres.map((genre) => (
						<Option key={genre.id} value={genre.id}>
							{genre.name}
						</Option>
					))}
				</CustomSelect>
			</SectionSearch>
			<Grid>
				{movies.map((movie) => (
					<div
						key={movie.id}
						onClick={() => handleSerieDetails(movie.id)}
					>
						<img
							src={`${imageBaseUrl}${movie.poster_path}`}
							alt={movie.name}
							style={{ borderRadius: "14px", height: "300px" }}
						/>
						<CardContent>
							<p>{movie.name}</p>
						</CardContent>
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
	opacity: 0.4;
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
	gap: 12px;
`;

const SectionSearch = styled.section`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	gap: 12px;
	width: 100%;
	padding: 40px 15%;
`;

const CustomSelect = styled.select`
	flex: 0 1 100px;
	padding: 8px;
	height: 55px;
	font-size: 16px;
	border-radius: 5px;
	background-color: var(--secondary);
	color: white;
`;

const Option = styled.option``;

const InputSearch = styled.input`
	flex: 1 1 300px;
	height: 54px;
	background-color: #ffffff15;
	border-radius: 14px;
	padding: 12px;
	border: 2px solid #ccc;
	margin-top: 4px;
	color: white;
`;


const CardContent = styled.div`
	padding: 4px;
	width: 100%;
	font-size: 0.8rem;
`;


export default Series;

import React, { useEffect, useState } from "react";
import api from "../../api/backend";
import { getMoviesByIds } from "../../hooks/tmbd/useMovie";
import styled from "styled-components";
import { TextDetails } from "../../components/TextDetails";
import { FormatCurrency } from "../../hooks/FormatCurrency";
import { useNavigate } from "react-router-dom";
import { getSeriesByIds } from "../../hooks/tmbd/useSeries";
import { motion } from "framer-motion";

export const LikesList = ({ user }) => {
	const navigate = useNavigate();
	const [moviesDetails, setMoviesDetails] = useState([]);
	const [seriesDetails, setSeriesDetails] = useState([]);

	useEffect(() => {
		const fetchList = async () => {
			try {
				// Passando id_user como query parameter
				const responseMovie = await api.get(`/likes/movies/list`, {
					params: { id_user: user.id }
				});

				const responseSerie = await api.get(`/likes/series/list`, {
					params: { id_user: user.id }
				});

				const moviesId = responseMovie.data
					?.map((movie) => movie.id_movie_ref)
					.filter((movie) => movie !== null);

				const seriesId = responseSerie.data
					?.map((serie) => serie.id_serie_ref)
					.filter((serie) => serie !== null);

				const detailedMovies = await getMoviesByIds(moviesId); // Busque os detalhes dos filmes
				const detailedSeries = await getSeriesByIds(seriesId); // Busque os detalhes dos series

				setSeriesDetails(detailedSeries);
				setMoviesDetails(detailedMovies); // Armazene os detalhes no estado
			} catch (error) {
				console.log(error);
			}
		};

		if (user && user.id) {
			fetchList();
		}
	}, [user]);

	const handleMovieDetails = (id) => {
		navigate(`/movies/${id}`);
	};

	const handleSerieDetails = (id) => {
		navigate(`/series/${id}`);
	};

	return (
		<Container>
			<div style={{ maxWidth: "800px", padding: "20px 0px" }}>
				<Title>
					<Label>Explore</Label> sua lista de filmes favoritos
				</Title>
				<Subtitle>
					curta e descurta à vontade, ajustando-a para expressar seus
					gostos atuais e aqueles filmes que sempre merecem um lugar
					especial.
				</Subtitle>
			</div>
			<h2>Filmes</h2>
			{moviesDetails?.map((movie) => (
				<ContainerMovies
					initial={{ opacity: 0, X: -100 }}
					animate={{ opacity: 1, X: 0 }}
					exit={{ opacity: 0, X: -100 }}
					transition={{ duration: 0.5 }}
					key={movie.id}
					onClick={() => handleMovieDetails(movie.id)}
				>
					<Image
						src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
						alt={movie.title}
					/>
					<ContainerContent>
						<TitleCard>{movie.title}</TitleCard>
						<Content>
							<TextDetails
								title="Data de Lançamento"
								data={movie.release_date}
							/>
							<TextDetails
								title="Duração"
								data={`${movie.runtime} minutos`}
							/>
							<TextDetails
								title="Média de Avaliação"
								data={movie.vote_average}
							/>
							<TextDetails
								title="Número de Avaliações"
								data={movie.vote_count}
							/>
							<TextDetails
								title="Idioma Original"
								data={movie.original_language}
							/>
							<TextDetails
								title="Orçamento"
								data={FormatCurrency(movie.budget)}
							/>
							<TextDetails
								title="Receita"
								data={FormatCurrency(movie.revenue)}
							/>
						</Content>
					</ContainerContent>
				</ContainerMovies>
			))}
			{/* SERIES */}
			<h2>Séries</h2>
			{seriesDetails?.map((movie) => (
				<ContainerMovies
					key={movie.id}
					onClick={() => handleSerieDetails(movie.id)}
				>
					<Image
						src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
						alt={movie.original_name}
					/>
					<ContainerContent>
						<TitleCard>{movie.original_name}</TitleCard>
						<Content>
							<TextDetails
								title="Data de Lançamento"
								data={movie.release_date}
							/>
							<TextDetails
								title="Duração"
								data={`${movie.runtime} minutos`}
							/>
							<TextDetails
								title="Média de Avaliação"
								data={movie.vote_average}
							/>
							<TextDetails
								title="Número de Avaliações"
								data={movie.vote_count}
							/>
							<TextDetails
								title="Idioma Original"
								data={movie.original_language}
							/>
						</Content>
					</ContainerContent>
				</ContainerMovies>
			))}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Title = styled.h1`
	padding: 20px 0;
	font-size: 2rem;
	font-weight: 600;
`;

const Subtitle = styled.h2`
	font-size: 1.5;
	font-weight: 300;
`;

const Label = styled.label`
	color: var(--secondary);
`;

const ContainerMovies = styled(motion.div)`
	padding: 12px;
	display: flex;
	height: 250px;
	max-width: 800px;
	background-color: #ffffff10;
	border-radius: 14px;
	box-shadow: 0 5px 5px 10px #00000020;

	&:hover {
		opacity: 0.5;
	}
`;

const Image = styled.img`
	/* width: 200px; */
	object-fit: cover;
	height: 100%;
`;

const ContainerContent = styled.div`
	padding: 20px;
	width: 100%;
`;

const Content = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	color: var(--quaternary);
	gap: 20px;
	font-size: 0.75rem;

	@media (max-width: 450px) {
		font-size: .45rem
	}
`;

const TitleCard = styled.h1`
	font-size: 1rem;

	@media (max-width: 450px) {
		font-size: 0.6rem;
	}
`;

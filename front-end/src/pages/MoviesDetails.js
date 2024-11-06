import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../hooks/useTmdb";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Loading } from "./Loading";
import { Button } from "../components/Button";
import { FormatCurrency } from "../hooks/FormatCurrency";
import { TextDetails } from "../components/TextDetails";
import { Comments } from "../components/Comments";

const MoviesDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);

	const imageBaseUrl = "https://image.tmdb.org/t/p/original";
	// const imagePosterUrl = "https://image.tmdb.org/t/p/w300";
	const providers = movie?.["watch/providers"]?.results?.BR?.flatrate;
	const trailer = movie?.videos.results[0]; // Pega o primeiro trailer

	console.log(movie?.["watchproviders".results]);

	useEffect(() => {
		const fetchMovieDetails = async () => {
			const data = await getMovieDetails(id);
			setMovie(data);
		};

		fetchMovieDetails();
	}, [id]);

	if (!movie) return <Loading />;

	return (
		<Page
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			<BgImage src={`${imageBaseUrl}${movie.backdrop_path}`} />
			<Banner>
				<BannerText>
					<h1 style={{ fontSize: "56px" }}>{movie.title}</h1>
					<p style={{ fontWeight: "bold" }}>
						{movie.genres.map((genre) => genre.name).join(" - ")}
					</p>
					<p style={{ width: "50%", fontSize: "24px" }}>
						{movie.overview}
					</p>
					<Providers>
						{providers?.map((provider) => (
							<div key={provider.id}>
								<img
									src={`${imageBaseUrl}${provider.logo_path}`}
									alt={provider.provider_id}
								/>
							</div>
						))}
					</Providers>
				</BannerText>
			</Banner>

			<About>
				{trailer && (
					<iframe
						width="560"
						height="315"
						src={`https://www.youtube.com/embed/${trailer.key}?si=OwiVHLE7kJAwH7G-`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
						referrerPolicy="strict-origin-when-cross-origin"
					></iframe>
				)}

				<GridData>
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
				</GridData>
			</About>
			<ContainerComennts>
				<Comments />
			</ContainerComennts>
		</Page>
	);
};

const BgImage = styled.img`
	position: fixed;
	width: 100vw;
	height: 100vh;
	object-fit: cover;
	z-index: -2;
	top: 0;
	left: 0;
`;

const Page = styled(motion.div)`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	color: white;
	position: relative;
`;

const Banner = styled(motion.section)`
	display: flex;
	flex-direction: column;
	justify-content: end;
	align-items: start;
	padding: 5%;
	width: 100%;
	min-height: 100vh;
	background-size: cover;
	background-position: center;
	background-image: linear-gradient(360deg, var(--primary-t), transparent);
`;

const BannerText = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Providers = styled.div`
	display: flex;
	gap: 20px;
`;

const About = styled.section`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-evenly;
	gap: 100px;
	background-color: var(--primary-t);
	padding: 50px 5%;
`;

const GridData = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: auto;
	gap: 12px;
`;

const ContainerComennts = styled.section`
	background-color: var(--primary-t);
`;

export default MoviesDetails;

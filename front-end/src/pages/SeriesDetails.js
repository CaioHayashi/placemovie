import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Loading } from "./Loading";
import { TextDetails } from "../components/TextDetails";
import { useAuth } from "../hooks/useAuth";
import NavBarLogin from "../components/NavBarLogin";
import { ProviderButton } from "../components/ProviderButton";
import { getSeriesDetails } from "../hooks/tmbd/useSeries";
import { SeriesComments } from "../components/SeriesComments";
import LikeSerieButton from "../components/LikeSerieButton";

const SeriesDetails = () => {
	const { user } = useAuth();
	const { id } = useParams();
	const [serie, setSerie] = useState(null);

	const imageBaseUrl = "https://image.tmdb.org/t/p/original";
	const providers = serie?.["watch/providers"]?.results?.BR?.flatrate;
	const trailer = serie?.videos.results[0]; // Pega o primeiro trailer

	console.log(serie?.["watchproviders".results]);

	useEffect(() => {
		const fetchSerieDetails = async () => {
			const data = await getSeriesDetails(id);

			console.log(data);
			setSerie(data);
		};

		fetchSerieDetails();
	}, [id]);

	if (!serie) return <Loading />;

	return (
		<Page
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			<NavBarLogin />
			<BgImage src={`${imageBaseUrl}${serie.backdrop_path}`} />

			<Banner>
				<Line>
					<BannerText>
						<h1 style={{ fontSize: "56px" }}>
							{serie.original_name}
						</h1>
						<p style={{ fontWeight: "bold" }}>
							{serie.genres
								.map((genre) => genre.name)
								.join(" - ")}
						</p>
						<p style={{ maxWidth: "500px", fontSize: "24px" }}>
							{serie.overview}
						</p>
						<Providers>
							{providers?.map((provider) => (
								<ProviderButton
									provider={provider}
									key={provider.id}
								/>
							))}
						</Providers>
					</BannerText>
					<Like>
						{!user && (
							<NavLink to="/login" style={{ fontSize: ".8rem" }}>
								Entre para curtir e adicionar filmes à sua
								lista!
							</NavLink>
						)}
						<LikeSerieButton
							serieId={id}
							userId={user?.id}
							disabled={!user}
						/>
					</Like>
				</Line>
			</Banner>

			<ContainerSeasons>
				<h1>Temporadas</h1>
				<Seasons>
					{serie.seasons?.map((season) => (
						<SeasonCard key={season.id}>
							<SeasonImage
								src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
								alt={season.name}
							/>
							<p>{season.name}</p>
							<p>{season.episode_count} episódios</p>
						</SeasonCard>
					))}
				</Seasons>
			</ContainerSeasons>

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
						title="Último Episódio"
						data={serie.last_air_date}
					/>
					<TextDetails
						title="Epsódios"
						data={`${serie.number_of_episodes}`}
					/>
					<TextDetails
						title="Média de Avaliação"
						data={serie.vote_average}
					/>
					<TextDetails
						title="Número de Avaliações"
						data={serie.vote_count}
					/>
					<TextDetails
						title="Idioma Original"
						data={serie.original_language}
					/>
					{/* <TextDetails
						title="Orçamento"
						data={FormatCurrency(serie.budget)}
					/>
					<TextDetails
						title="Receita"
						data={FormatCurrency(serie.revenue)}
					/> */}
				</GridData>
			</About>

			{id && (
				<ContainerComennts>
					<SeriesComments movieId={id} />
				</ContainerComennts>
			)}
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
	padding: 5% 10%;
	width: 100%;
	min-height: 95vh;
	background-size: cover;
	background-position: center;
	background-image: linear-gradient(360deg, var(--primary-t), transparent);
`;

const BannerText = styled(motion.div)`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const Line = styled.div`
	display: flex;
	align-items: end;
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

const Like = styled.div`
	position: fixed;
	display: flex;
	align-items: center;
	gap: 12px;
	right: 5%;
`;

const ContainerSeasons = styled.section`
	display: flex;
	flex-direction: column;
	overflow: hidden; /* Impede que o conteúdo transborde */
	background-color: var(--primary-t);
	padding: 20px 5%;
`;

const Seasons = styled.section`
	display: flex;
	gap: 20px;
	padding: 20px;
	overflow-x: scroll;
	scroll-snap-type: x mandatory;
	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* Para o IE 10+ */
	scrollbar-width: none; /* Para Firefox */
`;

const SeasonCard = styled.div`
	flex-shrink: 0;
	width: 200px;
	text-align: center;
	margin-left: 20px; /* Margem à esquerda no item */
	scroll-snap-align: start;
`;

const SeasonImage = styled.img`
	width: 100%;
	border-radius: 8px;
`;

export default SeriesDetails;

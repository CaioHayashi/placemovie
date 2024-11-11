import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTrendings } from "../hooks/useTmdb";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { motion } from "framer-motion";

export const Trendings = () => {
	const navigate = useNavigate();
	const [trendings, setTrendings] = useState([]);
	const [mainTrend, setMainTrend] = useState();

	const imageBaseUrl = "https://image.tmdb.org/t/p/original";

	useEffect(() => {
		const fetchTrendings = async () => {
			const data = await getTrendings();
			setTrendings(data); // Armazena os dados no estado
			setMainTrend(data[0]);
		};

		fetchTrendings();
	}, []);

	const handleMainTrendings = (movie) => {
		setMainTrend(movie);
		console.log(mainTrend);
	};

	const handleMovieDetails = (id) => {
		navigate(`/movies/${id}`);
	};

	return (
		<Container>
			<Title>#Top5 Tendências da Semana</Title>
			<Main
				$imageUrl={`${imageBaseUrl}${mainTrend?.backdrop_path}`}
				key={mainTrend?.id}
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -100 }}
				transition={{ duration: 0.5 }}
			>
				<h2>{mainTrend?.title}</h2>
				<p style={{ maxWidth: "400px" }}>{mainTrend?.overview}</p>
				<Button
					width="fit-content"
					onClick={() => handleMovieDetails(mainTrend?.id)}
				>
					Ver Mais
				</Button>
			</Main>
			<Cards>
				{trendings?.map((movie) => (
					<Card
						key={movie.id}
						$isActive={movie.id === mainTrend?.id}
						onClick={() => handleMainTrendings(movie)}
						$imageUrl={`${imageBaseUrl}${movie?.poster_path}`}
					></Card>
				))}
			</Cards>
		</Container>
	);
};

const Container = styled.section`
  width: 100%;
	display: flex;
	flex-direction: column;
	margin: auto;
	padding: 20px 20px;
	gap: 10px;
  border-radius: 20px;
  background-color: var(--quaternary-t);
`;

const Title = styled.h1`
	margin: 10px;
	font-size: 1.8rem;
`;

const Main = styled(motion.section)`
	width: 100%;
	height: 50vh;
	max-height: 500px;
	background-image: linear-gradient(90deg, var(--primary), transparent),
		url(${(props) => props.$imageUrl});
	background-size: cover;
	background-position: center;
	padding: 20px;
	position: relative;
	transition: background-image 0.5s ease-in-out;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 12px;
	border-radius: 12px;
	box-shadow: 0 4px 8px #000000cc;
`;

const Cards = styled.div`
	width: 100%;
	display: flex;
	gap: 10px;
	padding: 10px 0;
	overflow-x: auto;
	justify-content: flex-end;
`;

const Card = styled.div`
	flex: 0 0 150px;
	height: 220px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-image: ${(props) =>
		!props.$isActive
			? "linear-gradient(var(--primary-t), var(--primary-t)),"
			: ""}
		url(${(props) => props.$imageUrl});
	background-size: cover;
	background-position: center;
	box-shadow: 0 4px 8px #000000cc;
	transition: transform 0.3s ease;
	cursor: pointer;

	&:hover {
		transform: scale(1.05);
	}
`;

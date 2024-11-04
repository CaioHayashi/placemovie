import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../hooks/useTmdb";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Loading } from "./Loading";

const MoviesDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);

	const imageBaseUrl = "https://image.tmdb.org/t/p/original";

	useEffect(() => {
		const fetchMovieDetails = async () => {
			const data = await getMovieDetails(id);
			setMovie(data);
		};

		fetchMovieDetails();
	}, [id]);

	if (!movie) return <Loading/>;

	return (
		<Page
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
			style={{
				backgroundImage: `url(${imageBaseUrl}${movie.backdrop_path})`
			}}
		>
			{movie.title}
		</Page>
	);
};

const Page = styled(motion.div)`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	color: white;
	padding: 20px 5%;
`;

export default MoviesDetails;

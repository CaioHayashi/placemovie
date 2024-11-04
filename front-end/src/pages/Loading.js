import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export const Loading = () => {
	return (
		<Page
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			
			transition={{ duration: 0.5 }}
		>
			Carregando...
		</Page>
	);
};

const Page = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-size: cover;
	background-position: center;
	background-attachment: fixed;
	color: white;
`;

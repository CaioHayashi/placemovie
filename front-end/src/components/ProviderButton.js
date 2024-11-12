import React from "react";
import styled from "styled-components";

const links = {
	484: "https://www.clarotvmais.com.br",
  167: "https://www.clarovideo.com/brasil/landing",
	8: "https://www.netflix.com/browse",
	119: "https://www.primevideo.com/?_encoding=UTF8&language=pt_br",
	337: "https://www.disneyplus.com/home",
	307: "https://globoplay.globo.com",
	1899: "https://play.max.com"
};

export const ProviderButton = ({ provider }) => {

	const imageBaseUrl = "https://image.tmdb.org/t/p/original";

	const handleProvider = () => {
    console.log(provider.provider_id)
		const link = links[provider.provider_id]
    window.open(link, "_blank", "noopener,noreferrer")
	};

	return (
		<Provider onClick={handleProvider}>
			<Image
				src={`${imageBaseUrl}${provider.logo_path}`}
				alt={provider.provider_id}
			/>
		</Provider>
	);
};

const Provider = styled.div`
	height: fit-content;
	cursor: pointer;
	transition: all 0.5s;

	&:hover {
		scale: 1.1;
	}
`;
const Image = styled.img`
	height: 100%;
`;

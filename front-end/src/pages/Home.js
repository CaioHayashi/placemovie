import styled from "styled-components";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";

import banner from "../assets/banner_home.png";
import NavBarLogin from "../components/NavBarLogin";
import { Trendings } from "../components/Trendings";
import { HorrorMovies } from "../components/HorrorMovies";

export const Home = () => {

	return (
		<Page
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			<Banner>
				<NavBarLogin />
				<p
					style={{
						fontSize: "3rem",
						maxWidth: "500px",
						margin: "20px",
						alignItems: "center",
						fontWeight: "lighter"
					}}
				>
					<Bold>Descubra</Bold>, <Bold>explore</Bold> e{" "}
					<Bold>mergulhe</Bold> nos melhores filmes{" "}
				</p>
				<NavBar />
			</Banner>

			<Main>
				<div>
					<Trendings />
				</div>
				<div>
					<HorrorMovies />
				</div>
			</Main>
		</Page>
	);
};

const Page = styled(motion.div)`
	display: flex;
	flex-direction: column;

	flex-wrap: wrap;

	color: white;
`;

const Banner = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	aspect-ratio: 8/3;
	min-height: 600px;
	background-color: #333;
	background-image: url(${banner});
	background-size: cover;
	background-position: center;
`;

const Main = styled.main`
	display: flex;
	flex-direction: column;
	gap: 40px;
	margin: 40px 0;
`;

const Bold = styled.label`
	font-weight: bold;
`;

import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";

import banner from "../assets/banner_home.png";
import NavBarLogin from "../components/NavBarLogin";
import { Trendings } from "../components/Trendings";
import { HorrorMovies } from "../components/HorrorMovies";

export const Home = () => {
	const { user } = useAuth();

	return (
		<Page
			initial={{ opacity: 0, y: -100 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -100 }}
			transition={{ duration: 0.5 }}
		>
			<Banner>
				<NavBarLogin />
				<p
					style={{
						fontSize: "54px",
						width: "500px",
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
	height: 80vh;
	background-color: #333;
	background-image: url(${banner});
	background-size: cover;
	background-position: center;
`;

const Main = styled.main`
	display: flex;
	flex-direction: column;
	gap: 70px;
	margin: 5% 10%;
`;

const Bold = styled.label`
	font-weight: bold;
`;

const HeaderSection = styled.h1`
	padding: 20px 30px;
	border-radius: 12px;
	color: white;
	font-size: 1.8rem;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
`;
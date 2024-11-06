import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import NavLogin from "../components/NavLogin";

export const Home = () => {
	const { user, signOut } = useAuth();

	return (
		<Page
			initial={{ opacity: 0, y: -100 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -100 }}
			transition={{ duration: 0.5 }}
		>
			<Banner>
				{user ? (
					<div>
						<button onClick={signOut}>sair</button>
					</div>
				) : (
					<NavLogin />
				)}
				<NavBar />
			</Banner>

			<div>Home</div>
			{user && <p>Olá, {user.name}</p>}
		</Page>
	);
};



const Page = styled(motion.div)`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	flex-wrap: wrap;

	color: white;
`;

const Banner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 70vh;
	background-color: #333;
	background-image: url();
`;

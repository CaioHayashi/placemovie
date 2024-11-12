import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Details } from "./Details";
import { LikesList } from "./LikesList";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import bg from "../../assets/bg_profile.png";
import { motion } from "framer-motion";
import NavBarLogin from "../../components/NavBarLogin";

export const Profile = () => {
	const { user } = useAuth();

	return (
		<Page
			initial={{ opacity: 0, X: -100 }}
			animate={{ opacity: 1, X: 0 }}
			exit={{ opacity: 0, X: -100 }}
			transition={{ duration: 0.5 }}
		>
			<NavBarLogin var2/>
			<BgImage src={bg} />
			<ContainerPage>
				<Sidebar />
				<Content>
					<Routes>
						<Route
							path="/details"
							element={<Details user={user} />}
						/>
						<Route
							path="/likeslist"
							element={<LikesList user={user} />}
						/>
					</Routes>
				</Content>
			</ContainerPage>
		</Page>
	);
};

const Page = styled(motion.div)`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const ContainerPage = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	flex: 1;
`;

const BgImage = styled.img`
	position: fixed;
	width: 100vw;
	height: 100vh;
	object-fit: cover;
	z-index: -1;
`;

const Content = styled.div`
	flex: 6 1 700px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 5%;
	overflow-y: auto;
`;

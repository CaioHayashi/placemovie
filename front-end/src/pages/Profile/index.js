import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Details } from "./Details";
import {  LikesList } from "./LikesList";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";

export const Profile = () => {
	const { user } = useAuth();

	return (
		<ProfilePageContainer>
			{/* Sidebar fixa à esquerda */}
			<Sidebar />

			{/* Área principal que será alterada conforme a navegação */}
			<ContentContainer>
				<Routes>
					<Route path="/details" element={<Details user={user} />} />
					<Route
						path="/likesList"
						element={<LikesList user={user} />}
					/>
				</Routes>
			</ContentContainer>
		</ProfilePageContainer>
	);
};

const ProfilePageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
`;

const ContentContainer = styled.div`
	background-color: var(--primary-t);
	min-width: 1200px;
	padding: 20px;
	height: 100%;
`;

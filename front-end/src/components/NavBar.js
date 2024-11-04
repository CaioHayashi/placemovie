import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
	return (
		<Container>
			<NavLink to="/" style={{ padding: "12px" }}>
				INICIO
			</NavLink>
			<NavLink to="/movies" style={{ padding: "12px" }}>
				FILMES
			</NavLink>
			<NavLink to="/movies" style={{ padding: "12px" }}>
				SERIES
			</NavLink>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	color: white;
`;

export default NavBar;

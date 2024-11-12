import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = () => {
	return (
		<Container>
			<StyledNavLink exact="true" to="/">
				TENDÊNCIAS
			</StyledNavLink>
			<StyledNavLink exact="true" to="/movies">
				FILMES
			</StyledNavLink>
			<StyledNavLink exact="true" to="/series">
				SERIES
			</StyledNavLink>
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

const StyledNavLink = styled(NavLink)`
	padding: 12px;
	text-decoration: none;
	color: white;

	&.active {
		font-weight: bold;
		color: var(--secondary)
	}
`;

export default NavBar;

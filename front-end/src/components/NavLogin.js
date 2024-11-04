import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavLogin = () => {
	return (
		<Container>
			<NavLink to="/login" style={{ padding: "12px" }}>
				Entrar
			</NavLink>
			<NavLink to="/register" style={{ padding: "12px" }}>
				Logar
			</NavLink>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;
	color: white;
`;

export default NavLogin;

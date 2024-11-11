import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo-placemovie.svg";
import { IoPersonCircleSharp } from "react-icons/io5";


const NavBarLogin = () => {
	const { user, signOut } = useAuth();
	return (
		<>
			{!user ? (
				<Container>
					<img src={logo} alt="logo" width="100px" />
					<div>
						<NavLink to="/login" style={{ padding: "12px" }}>
							Entrar
						</NavLink>
						<NavLink to="/register" style={{ padding: "12px" }}>
							Cadastre-se
						</NavLink>
					</div>
				</Container>
			) : (
				<Container>
					<img src={logo} alt="logo" width="100px" />
					{/* <label style={{ padding: "12px" }} onClick={signOut}>
						Sair
					</label> */}
					<NavLink to="/profile/details">
						<IoPersonCircleSharp size={54} color={"var(--quaternary)"}/>
					</NavLink>
				</Container>
			)}
		</>
	);
};

const Container = styled.div`
	padding: 20px;
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	color: white;
`;

export default NavBarLogin;

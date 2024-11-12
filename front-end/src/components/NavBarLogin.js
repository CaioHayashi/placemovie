import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo-placemovie.svg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

const NavBarLogin = ({ var2 }) => {
	const { user } = useAuth();
	return (
		<>
			{!var2 ? (
				!user ? (
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
						<img src={logo} alt="logo" width="80px" />

						<NavLink to="/profile/likeslist">
							<IoPersonCircleSharp
								size={44}
								color={"var(--quaternary)"}
							/>
						</NavLink>
					</Container>
				)
			) : (
				<Container>
					<img src={logo} alt="logo" width="80px" />

					<NavLink to="/">
						<IoCloseSharp size={44} color={"var(--quaternary)"} />
					</NavLink>
				</Container>
			)}
		</>
	);
};

const Container = styled.div`
	padding: 20px 5%;
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
	color: white;
`;

export default NavBarLogin;

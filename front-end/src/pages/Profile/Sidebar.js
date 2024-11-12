// components/Sidebar.js
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
	const navigate = useNavigate()
	const location = useLocation();
	const { signOut } = useAuth();
	const handleLogOut = () => {
		signOut()
		navigate("/")
	}

	return (
		<SidebarContainer>
			{/* Links de navegação para as rotas */}
			<SidebarLink
				to="/profile/details"
				$isActive={location.pathname === "/profile/details"}
			>
				Perfil
			</SidebarLink>
			<SidebarLink
				to="/profile/likeslist"
				$isActive={location.pathname === "/profile/likeslist"}
			>
				Lista de Curtidas
			</SidebarLink>
			<LogoutButton onClick={handleLogOut}>Sair</LogoutButton>
		</SidebarContainer>
	);
};

const SidebarContainer = styled.div`
	flex: 1 1 250px; /* Largura da sidebar */
	height: 100%;
	/* background-color: var(--primary); */
	padding: 40px;
	display: flex;
	flex-direction: column;
`;

const SidebarLink = styled(Link)`
	margin-bottom: 10px;
	font-size: 1rem;
	padding: 15px 10px;
	text-decoration: none;
	color: var(--quaternary);
	border-radius: 8px;
	background-color: ${(props) => (props.$isActive ? "#ffffff10" : "")};
	&:hover {
		color: white; /* Cor ao passar o mouse */
	}
`;

const LogoutButton = styled.button`
	cursor: pointer;
	background-color: transparent;
	text-align: start;
	margin-bottom: 10px;
	font-size: 1rem;
	padding: 15px 10px;
	text-decoration: none;
	color: var(--quaternary);
`;

export default Sidebar;

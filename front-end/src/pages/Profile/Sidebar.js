// components/Sidebar.js
import { Link } from "react-router-dom";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <SidebarContainer>
      {/* Links de navegação para as rotas */}
      <SidebarLink to="/profile/details">Detalhes</SidebarLink>
      <SidebarLink to="/profile/likesList">Lista de Curtidas</SidebarLink>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
	width: 220px; /* Largura da sidebar */
	background-color: #121e36;
	padding: 20px;
	display: flex;
	flex-direction: column;
`;

const SidebarLink = styled(Link)`
  margin-bottom: 10px;
  text-decoration: none;
  color: var(--quaternary);

  &:hover {
    color: var(--secondary); /* Cor ao passar o mouse */
  }
`;

export default Sidebar;



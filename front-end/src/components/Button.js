import React from "react";
import styled from "styled-components";

export const Button = ({ children, width, onClick }) => {
	return (
		<Container onClick={onClick} style={{ width: width }}>
			{children}
		</Container>
	);
};

const Container = styled.button`
	width: 100%;
	height: 54px;
	padding: 16px;
	background-color: var(--secondary);
	border-radius: 14px;
	color: white;
	text-transform: uppercase;
	font-weight: bold;
`;

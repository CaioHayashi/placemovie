import React from "react";
import styled from "styled-components";

export const Button = ({ children, width, onClick, disabled }) => {
	return (
		<Container
			disabled={disabled}
			onClick={onClick}
			style={{ width: width }}
		>
			{children}
		</Container>
	);
};

const Container = styled.button`
	width: 100%;
	padding: 16px;
	font-size: 12px;
	background-color: ${(props) =>
		props.disabled ? "var(--disabled)" : "var(--secondary)"};
	border-radius: 14px;
	color: white;
	text-transform: uppercase;
	font-weight: bold;
`;

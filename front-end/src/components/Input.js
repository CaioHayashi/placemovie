import React from "react";
import styled from "styled-components";

export const Input = ({ widht, type, value, onChange, placeholder }) => {
	return <Container width={widht} type={type} value={value} onChange={onChange} placeholder={placeholder}></Container>;
};

const Container = styled.input`
	width: 100%;
	height: 54px;
	background-color: #ffffff15;
	border-radius: 14px;
	padding: 12px;
	border: 2px solid #ccc;
	margin-top: 4px;
	color: white;
`;

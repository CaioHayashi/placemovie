import React from 'react'
import styled from 'styled-components';

export const Button = ({children}) => {
  return (
    <Container>{children}</Container>
  )
}

const Container = styled.button`
	width: 100%;
	height: 54px;
	background-color: var(--secondary);
	border-radius: 14px;
	color: white;
    text-transform: uppercase;
    font-weight: bold;
`;
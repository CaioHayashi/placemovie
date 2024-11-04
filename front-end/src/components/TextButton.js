import React from 'react'
import styled from 'styled-components';

export const TextButton = ({onClick, children}) => {
  return (
    <Container onClick={onClick}>{children}</Container>
  )
}

const Container = styled.button`
	width: 100%;
	height: 54px;
	border-radius: 14px;
  background-color: transparent;
	color: white;
    text-transform: uppercase;
    font-weight: bold;
`;
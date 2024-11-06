import React from 'react'
import styled from 'styled-components'

export const TextDetails = ({title, data}) => {
  return (
    <Container>
        <Title>{title}</Title>
        <p>{data}</p>
    </Container>
  )
}

const Title = styled.p`
	margin-top: 12px;
	font-weight: bold;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;

`
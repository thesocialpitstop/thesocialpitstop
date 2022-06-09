import styled from "styled-components";

export const TitleDiv = styled.div`
  background-color: #EEA47FFF;
  border-radius: 2rem;
  margin: 1.25rem;
  text-align: center;
  padding: 0.5rem;
`;


export const Title = styled.h1`
  font-size: 50px;
  font-family: Montserrat, sans-serif;
  color: ${({ theme }) => theme.colors.primary};
`

export const Subtitle = styled.h3`
  font-family: Montserrat, sans-serif;
  color: ${({ theme }) => theme.colors.primary};
`

export const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  @media (max-width: 768px) {
    grid-template-columns: repeat(2,minmax(0,1fr));
  }
`;

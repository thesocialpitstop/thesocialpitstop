
import styled from 'styled-components';

export const ItemStyle = styled.a`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 1px solid transparent;
    border-style: solid;  
    border-radius: 1rem;


    &:hover {
        border: 1px solid gray;
        border-style: solid;
    }

    &:focus {
        border: 1px solid gray;
        border-style: solid;
    }
`;

export const ItemTitle = styled.h3`
text-align: center;
font-family: Montserrat, sans-serif;

`;
import Image from "next/image";
import styled from "styled-components";

export const SearchItemDiv = styled.a`
    display: grid;
    text-decoration: none;
    grid-template-columns: 1fr 3fr;
    font-family: Montserrat, sans-serif;
    @media (max-width: 768px) {
        padding-top: 4px;
    }
`;

export const SearchItemTitle = styled.a`
    text-decoration: none;
    font-size: larger;

    :hover {
        color: #7f75ae;
        text-decoration: underline;
    }
`;
export const SearchItemImage = styled.div`
    text-align: center;
`;
export const SearchItemDescription = styled.div`
`;
export const SearchItemAddress = styled.div``;
export const SearchItemTextSection = styled.div`
    display: grid;
`;
export const SearchItemImageSection = styled(Image)``;
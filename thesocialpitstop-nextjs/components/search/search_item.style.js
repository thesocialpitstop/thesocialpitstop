import Image from "next/image";
import styled from "styled-components";

export const SearchItemDiv = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Montserrat, sans-serif;
`;

export const SearchItemTitle = styled.a`
    text-decoration: none;
    font-size: larger;

    :hover {
        color: #7f75ae;
    }
`;
export const SearchItemImage = styled.div``;
export const SearchItemDescription = styled.div`
`;
export const SearchItemAddress = styled.div``;
export const SearchItemTextSection = styled.div`
    display: grid;
`;
export const SearchItemImageSection = styled(Image)``;
import Image from "next/image";
import styled from "styled-components";

export const SearchItemDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    font-family: Montserrat, sans-serif;
    //TRBL
    @media (max-width: 768px) {
        padding-top: 4px;
    }
    :hover {
        color: #7f75ae;
    }
`;

export const SearchItemTitle = styled.a`
    font-size: larger;
    font-weight: 600;
    //TRBL
`;
export const SearchItemImage = styled.div`
    text-align: center;
`;
export const SearchItemDescription = styled.div`
`;
export const SearchItemAddress = styled.div``;
export const SearchItemTextSection = styled.div`
`;
export const SearchItemImageSection = styled(Image)``;
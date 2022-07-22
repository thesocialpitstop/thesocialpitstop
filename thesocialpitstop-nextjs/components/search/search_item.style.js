import Image from "next/image";
import styled from "styled-components";

export const SearchItemDiv = styled.div`
    display: grid;
    grid-template-rows: 2fr 1fr;
    font-family: Montserrat, sans-serif;
    //TRBL
    @media (max-width: 768px) {
        padding-top: 4px;
    }

`;

export const SearchItemTitle = styled.div`
    cursor: pointer;
    text-overflow: ellipsis;
    font-size: larger;
    font-weight: 600;
    //TRBL
    :hover {
        color: #7f75ae;
    }
`;
export const SearchItemImage = styled.div`
    position: relative;
`;
export const SearchItemDescription = styled.div`
`;
export const SearchItemAddress = styled.div``;
export const SearchItemTextSection = styled.div`
    padding: 8px 16px;
`;
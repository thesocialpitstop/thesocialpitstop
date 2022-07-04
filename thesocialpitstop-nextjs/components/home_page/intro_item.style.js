import Image from "next/image";
import styled from "styled-components";

export const IntroItemDiv = styled.div`
    display: grid;
    font-family: Montserrat, sans-serif;
    grid-column-gap: 60px;
    padding: 0 20px 0 20px;
    justify-items: start;
    align-items: center;
    @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 768px) {
        grid-template-rows: 1fr 1fr;
    }
`;
export const IntroItemHeader = styled.h3``;
export const IntroItemContent = styled.p``;

export const IntroItemImage = styled(Image)`
    border-radius: 16px;
`;

export const IntroItemIconDiv = styled.div`
    margin: 0 auto;
`;
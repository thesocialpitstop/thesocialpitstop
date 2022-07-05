import Image from "next/image";
import styled from "styled-components";

export const Title = styled.h1`
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary};
`

export const HeroSection = styled.div`
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;

    @media (min-width: 768px) {
        padding-top: 200px;
        padding-bottom: 200px;
        grid-template-columns: 1fr 1fr;
        background-image: url('https://assets-global.website-files.com/62706e0299180d3045eb2cab/628d06c12974bce98a8412f1_Group%2040-1.svg');
        background-position: 0% 100%;
        background-size: cover;
    }
    @media (max-width: 768px) {
        background-color: #000c25;
        flex-direction: column;
        padding-top: 75px;
        padding-bottom: 150px;
        grid-template-rows: 1fr 1fr;
    }
`;

export const CarouselSection = styled.div`
    max-width: 1260px;
    @media (min-width: 768px) {
        width: 50%;
    }
    @media (max-width: 768px) {
        padding: 0px 20px 0px 20px; //TRBL
    }
`;

export const CarouselImageContainer = styled.div`
`;

export const CarouselImage = styled(Image)`
    border-radius: 16px;
`;

export const CarouselText = styled.h1`
    font-family: Montserrat, sans-serif;
    color: white;
`;

export const CarouselSubtitle = styled.p`
    font-family: Montserrat, sans-serif;
    color: white;
`;

//--------- INTRO SECTION ---------
export const IntroSection = styled.div`
    display: grid;
    grid-gap: 50px;
`;

export const IntroTitle = styled.div`
    font-family: Montserrat, sans-serif;
    text-align: center;
    font-size: larger;
`;

export const IntroText = styled.div`
    font-family: Montserrat, sans-serif;
    text-align: center;
`;

//--------- INTRO SECTION ---------


//--------- UPCOMING SECTION ---------
export const UpcomingCarousel = styled.div`
    font-family: Montserrat, sans-serif;
    font-size: x-large;
`;

export const CsrItemsDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));  
    grid-column: 1;
`;
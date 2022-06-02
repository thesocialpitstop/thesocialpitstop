import styled from "styled-components";

export const Title = styled.h1`
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary};
`
export const CarouselSection = styled.div`
    display: grid;
    align-content: center;
    height: 480px;
    background-image: url('/beach-cleanup.webp');
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
`;

export const CarouselText = styled.div`
    background-color: rgba(127, 117, 174, 0.7);
    font-family: Montserrat, sans-serif;
    font-weight: 800;
    text-align: center;
    font-size: 58px;
    color: white ;
`;

//--------- INTRO SECTION ---------
export const IntroSection = styled.div`
    height: 120px;
    //MOBILE SCREEN
    @media (max-width: 768px) {
        height: 200px;
    }
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
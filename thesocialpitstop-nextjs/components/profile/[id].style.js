import styled from "styled-components";

export const ProfilePage = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 5px;
  }
  @media (max-width: 768px) {
  }
`;

export const TitleDiv = styled.div`
  @media (max-width: 768px) {
      padding: 8px;
  }
`;

export const Title = styled.h1`
  font-family: Montserrat, sans-serif;
  font-size: xx-large;
`;

export const Subtitle = styled.h2`
  font-family: Montserrat, sans-serif;
`;

export const DetailsDiv = styled.div`
  padding: 5px;
  background-color: rgba(127, 117, 174, 0.3);
  margin-top: 8px;
  @media (max-width: 768px) {
      padding: 8px;
  }
`;
export const ItemTitle = styled.div`
  color: gray;
  font-size: small;
  font-family: Montserrat, sans-serif;

`;

export const ItemDetail = styled.div`
  font-family: Montserrat, sans-serif;
  font-size: larger;

  a:hover {
    text-decoration: underline;
    color: blue;
  }
`;

export const PastCsrDiv = styled.div`
  display: grid;
  grid-gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    @media (max-width: 768px) {
      padding: 8px;
    }
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const PastCsrItem = styled.div`
  overflow-x: scroll;
`;

export const ReviewDiv = styled.div`
  @media (max-width: 768px) {
      padding: 8px;
  }`;

export const ReviewItemDiv = styled.div`
  display: grid;
  grid-gap: 8px;
  padding: 25px;
  border: solid 1px #e6e6e6;
  border-style: solid;
  border-radius: 2px;
`;

export const ReviewUserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ReviewNameDiv = styled.div`
  font-weight: 600;
`;

export const ReviewContentDiv = styled.div``;

export const ReviewTitleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px
`;

export const MobileTabPanel = styled.div`
  @media (min-width: 768px) {
      display: none;
    }
`;

export const DesktopView = styled.div`
  @media (max-width: 768px) {
      display: none;
    }
`;

export const FollowPartnerButtonDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const ImageAndTitleDiv = styled.div``;
import styled from "styled-components";

export const EventCard = styled.div`
  @media (min-width: 768px) {
    border-style: solid;
    width: 270px;
    height: 2fr;
  }
  @media (max-width: 768px) {
  }
`;

export const EventCardTitle = styled.h2`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export const EventCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const EventCardDate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const EventCardLocation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

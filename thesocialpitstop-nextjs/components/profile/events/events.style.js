import styled from "styled-components";

export const EventsItemDiv = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

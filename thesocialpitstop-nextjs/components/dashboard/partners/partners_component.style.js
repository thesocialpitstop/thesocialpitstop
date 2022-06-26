import styled from "styled-components";

export const PartnersComponentDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const PartnerCardDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 16px;
`;

export const PartnerComponentItem = styled.div`
`;

export const PartnerComponentItemTitle = styled.a`
    font-size: 1.5em;
    font-weight: bold;

    :hover {
    text-decoration: underline;
    color: blue;
  }
`;

export const PartnerComponentItemDate = styled.div`
    display: flex;
    gap: 4px;
`;

export const ActionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    column-gap: 1rem;
    align-items: center;
`
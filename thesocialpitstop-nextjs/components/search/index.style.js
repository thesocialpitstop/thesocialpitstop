import { Button, TextField } from "@mui/material";
import styled from "styled-components";

export const SearchPageDiv = styled.div`
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const ResultsItemsDiv = styled.div`
  display: grid;
  grid-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 20% 80%;
  }
`;

export const SearchSectionDiv = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
`;

export const NameInput = styled(TextField)`
  width: 100%;
  padding: 10px 100px 10px 20px; 
  line-height: 1;
  outline: none;
`;

export const SearchButton = styled(Button)`
  height: 100%;
  width: 100%;
`;

export const CategorySectionDiv = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
`;

export const SearchBarItemsDiv = styled.div``;

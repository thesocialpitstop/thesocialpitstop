import { Button, TextField } from "@mui/material";
import styled from "styled-components";

export const SearchPageDiv = styled.div`
  display: grid;
  grid-auto-flow: column;

  @media (min-width: 768px) {
    padding-left: 200px;
    padding-right: 200px;
  }
`;

export const ResultsItemsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 2rem;
`;

export const SearchSectionDiv = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 50% 50%;
  grid-gap: 2rem;
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

export const CategorySectionDiv = styled.div``;

export const SearchBarItemsDiv = styled.div``;

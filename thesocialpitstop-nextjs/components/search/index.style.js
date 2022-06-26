import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import AnimatedShowMore from 'react-animated-show-more';

export const SearchPageDiv = styled.div`
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: 768px) {
    padding: 15px;
  }
  @media (max-width: 768px) {
    padding: 15px;
    grid-gap: 1rem;
  }
`;

export const ResultsItemsDiv = styled.div`
  display: grid;
  @media (max-width: 768px) {
    grid-gap: 1rem;
  }
  @media (min-width: 768px) {
    grid-template-columns: 1fr 3fr;
    grid-gap: 2rem;
    padding-top: 24px;
  }
`;

export const SearchSectionDiv = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 1rem;
`;

export const NameInput = styled(TextField)`
  width: 100%;
  line-height: 1;
  outline: none;
`;

export const SearchButton = styled(Button)``;

//Category Sidebar for width > 768
export const CategorySidebarDiv = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
`;

//Category dropdown for mobile devices
export const CategoryDropdownDiv = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

export const SearchBarItemsDiv = styled.div``;

export const ResultListDiv = styled.div`
  display: grid;
  grid-gap: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    padding-top: 24px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const FilterSortButtons = styled(Button)``;

import Link from "next/link";
import styled from "styled-components";
import AnimatedShowMore from "react-animated-show-more";
import { DemoToggle } from "./demo_toggle";
import categories from "../../constants/categories";

const CategoryItem = styled.div`
  font-family: Montserrat, sans-serif;
  padding: 5px 0px 5px 0px; //TRBL
  color: blue;
  :hover{
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const categoryList = categories.map((content) => {
  return (
    <Link key={content.name} href={`/search?category=${content.value}`}>
      <a>
        <CategoryItem key={content.name}>{content.name}</CategoryItem>
      </a>
    </Link>
  );
});

const CategoryTitle = styled.div`
  font-family: Montserrat, sans-serif;
  @media (min-width: 768px) {
    font-size: large;
  }
  @media (max-width: 768px) {
    border-radius: 25px;
    border: 2px solid #73ad21;
    padding: 5px;
    width: fit-content;
  }
`;

const CategoryListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchCategoryList = () => {
  return (
    <>
      <CategoryTitle>Categories</CategoryTitle>
      <CategoryListDiv>{categoryList}</CategoryListDiv>
    </>
  );
};

export default SearchCategoryList;

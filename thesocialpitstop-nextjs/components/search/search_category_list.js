import Link from "next/link";
import styled from "styled-components"
import AnimatedShowMore from 'react-animated-show-more';
import { DemoToggle } from "./demo_toggle";

const items = [
    "Education", 
    "F&B"
]

const CategoryList = items.map((content) => {
    return <Link key={content} href={`/search?category=${content}`}>{content}</Link>
})

const CategoryTitle = styled.div`
    font-family: Montserrat, sans-serif;
    @media (min-width: 768px) {
        font-size: large;
    }
    @media (max-width: 768px) {
        border-radius: 25px;
        border: 2px solid #73AD21;
        padding: 5px;
        width: fit-content;
    }
`;

const CategoryListDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const SearchCategoryList = () => {
    return(
        <>
            <CategoryTitle>Categories</CategoryTitle>
            <CategoryListDiv>
                    {CategoryList}
                </CategoryListDiv>
        </>
    )
}

export default SearchCategoryList;
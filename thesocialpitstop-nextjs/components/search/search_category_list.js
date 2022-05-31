import Link from "next/link";
import styled from "styled-components"

const items = [
    "Education", 
    "F&B"
]

const CategoryList = items.map((content) => {
    return <Link key={content} href={`/search?category=${content}`}>{content}</Link>
})

const CategoryListDiv = styled.div`
    display: flex;
    flex-direction: column;
`;

const SearchCategoryList = () => {
    return(
        <>
            <h2>Categories</h2>
            <CategoryListDiv>
                {CategoryList}
            </CategoryListDiv>
        </>
    )
}

export default SearchCategoryList;
import Link from "next/link";
import styled from "styled-components"
import categories from "../../options/categories";

const CategoryList = categories.map((content) => {
    return <Link key={content.name} href={`/search?category=${content.value}`}>{content.name}</Link>
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
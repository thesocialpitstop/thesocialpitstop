import styled from "styled-components";

export const PostsComponentDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
export const PostCardDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 16px;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;
export const PostComponentItem = styled.div`
`;
export const PostComponentItemTitle = styled.div`
    font-size: 1.5em;
    font-weight: bold;
`;
export const PostComponentItemDate = styled.div`
    display: flex;
    gap: 4px;
`;
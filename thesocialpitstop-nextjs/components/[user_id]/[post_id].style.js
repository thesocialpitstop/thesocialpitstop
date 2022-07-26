import Image from "next/image";
import styled from "styled-components";

export const BlogPostPage = styled.div`
    margin: 0 auto;
    padding: 100px 40px;
    max-width: 800px;
`;

export const BlogPostTitle = styled.h1`
    font-family: Montserrat, sans-serif;
    text-align: center;
    letter-spacing: -0.035em;
`;

export const BlogPostSubtitle = styled.div`
    margin: 40px 0;
    text-align: center;
`;

export const BlogPostAuthor = styled.span`
    color: #7f75ae;
`;

export const BlogPostImage = styled(Image)``;

export const BlogPostImageDiv = styled.div`
    max-width: 500px;
    margin: 0 auto;
`;
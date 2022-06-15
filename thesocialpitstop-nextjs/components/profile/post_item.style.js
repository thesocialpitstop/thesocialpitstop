import Image from "next/image";
import styled from "styled-components";

export const PostItemDiv = styled.div`
    border: 1px solid;
    border-color: #dadce0;
    border-radius: 8px;
    cursor: pointer;
    height: fit-content;
    position: relative;
    :hover{
        background: #fff;
        border: 0;
        box-shadow: 0 1px 2px rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
        padding: 1px;
    }
`;

export const PostItemTitleDiv = styled.div`
`;

export const PostImage = styled(Image)`
    border-radius: 8px;
    transition: all .4s;
    :hover {
        transform: scale(1.05);
    }
`;
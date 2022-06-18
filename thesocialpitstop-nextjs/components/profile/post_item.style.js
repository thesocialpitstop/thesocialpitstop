import Image from "next/image";
import styled from "styled-components";

export const PostItemDiv = styled.div`
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    height: 128px;
    display: flex;
    flex-direction: column-reverse;

`;

export const PostItemTitleDiv = styled.div`
    z-index: 1;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 0,0,8px,8px;
`;

export const PostImage = styled(Image)`
    border-radius: 8px;
    transition: all .4s;
    height: fit-content;
    :hover {
        transform: scale(1.05);
    }
`;
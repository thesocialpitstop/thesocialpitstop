import Image from "next/image";
import styled from "styled-components";

export const PostItemDiv = styled.div`
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
`;

export const PostItemTitleDiv = styled.div`
    z-index: 1;
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 0,0,8px,8px;
`;

export const PostImage = styled(Image)`
    border-radius: 25px;
    transition: all .4s;
    :hover {
        transform: scale(1.05);
    }
`;
import styled from "styled-components";
import Image from "next/image"
import Link from "next/link";

const SearchItemDiv = styled.a`
    display: grid;
    justify-items: center;
`;

const SearchItemImage = styled.image``;

export function SearchItem(props) {
    return(
        <Link href={`/profile/${props.item.user_id}`} passHref>
            <SearchItemDiv>
                <Image src="/icons/edu.png" width="64" height="64"></Image>
                {props.item.name}
            </SearchItemDiv>
        </Link>
    );
}
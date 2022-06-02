import styled from "styled-components";
import Image from "next/image"
import Link from "next/link";
import {
    SearchItemDiv,
    SearchItemTitle,
    SearchItemImage,
    SearchItemDescription,
    SearchItemAddress,
    SearchItemTextSection,
    SearchItemImageSection
} from './search_item.style';

const SearchItem = (props) => {
    return(
            <SearchItemDiv>
                <SearchItemTextSection>
                    <Link href={`/profile/${props?.item.user_id}`} passHref>
                        <SearchItemTitle>
                            {props?.item.name}   
                        </SearchItemTitle>
                    </Link>
                    <SearchItemAddress>
                        {props?.item.address}
                    </SearchItemAddress>
                    <SearchItemDescription>
                        {props?.item.details}
                    </SearchItemDescription>
                </SearchItemTextSection>
                <SearchItemImage>
                    <Link href={`/profile/${props?.item.user_id}`} passHref>
                        <Image src="/icons/edu.png" width="64" height="64"></Image>
                    </Link>
                </SearchItemImage>
            </SearchItemDiv>
    );
}

export default SearchItem;
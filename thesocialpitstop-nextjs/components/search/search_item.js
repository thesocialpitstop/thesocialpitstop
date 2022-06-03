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
import { Card } from "@mui/material";

const SearchItem = (props) => {
    return(
        <Card>
            <Link href={`/profile/${props?.item.user_id}`} passHref>
                <SearchItemDiv>
                    <SearchItemImage>
                        <Image src="/icons/edu.png" width="64" height="64"></Image>
                    </SearchItemImage>
                    <SearchItemTextSection>
                        <SearchItemTitle>
                            {props?.item.name}   
                        </SearchItemTitle>
                        <SearchItemAddress>
                            {props?.item.address}
                        </SearchItemAddress>
                        <SearchItemDescription>
                            {props?.item.details}
                        </SearchItemDescription>
                    </SearchItemTextSection>
                </SearchItemDiv>
            </Link>
        </Card>
    );
}

export default SearchItem;
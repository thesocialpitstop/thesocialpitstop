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
import EllipsisText from "react-ellipsis-text/lib/components/EllipsisText";

const SearchItem = (props) => {
    return(
        <Link href={`/profile/${props?.item.user_id}`} passHref>
            <a>
                <Card>
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
                                <EllipsisText text={props?.item.details} length={"100"}/>
                            </SearchItemDescription>
                        </SearchItemTextSection>
                    </SearchItemDiv>
                </Card>
            </a>
        </Link>   

    );
}

export default SearchItem;
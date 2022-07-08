import Image from "next/image"
import Link from "next/link";
import {
    SearchItemDiv,
    SearchItemTitle,
    SearchItemImage,
    SearchItemDescription,
    SearchItemAddress,
    SearchItemTextSection,
} from './search_item.style';
import { Card } from "@mui/material";
import EllipsisText from "react-ellipsis-text/lib/components/EllipsisText";
import { CLOUDFRONT_URL } from "../../constants/constants";

const SearchItem = (props) => {
    console.log(`${CLOUDFRONT_URL}/profile/${props?.item?.objectID}`);
    return(
        <Link href={`/profile/${props?.item?.objectID}`} passHref>
            <a>
                <Card>
                    <SearchItemDiv>
                        <SearchItemImage>
                            <Image 
                                src={`${CLOUDFRONT_URL}/profile/${props?.item?.objectID}`} 
                                layout="fill">
                            </Image>
                        </SearchItemImage>
                        <SearchItemTextSection>
                            <SearchItemTitle>
                                {props?.item.name}   
                            </SearchItemTitle>
                            <SearchItemAddress>
                                {props?.item.address}
                            </SearchItemAddress>
                            <SearchItemDescription>
                                <EllipsisText text={props?.item?.details} length={"20"}/>
                            </SearchItemDescription>
                        </SearchItemTextSection>
                    </SearchItemDiv>
                </Card>
            </a>
        </Link>   

    );
}

export default SearchItem;
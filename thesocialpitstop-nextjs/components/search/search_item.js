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
import { Card, Chip } from "@mui/material";
import EllipsisText from "react-ellipsis-text/lib/components/EllipsisText";
import { CLOUDFRONT_URL } from "../../constants/constants";
import categories from "../../constants/categories";

const SearchItem = (props) => {
    console.log(`${CLOUDFRONT_URL}/profile/${props?.item?.objectID}`);
    return(
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
                            <Link href={`/profile/${props?.item?.objectID}`} passHref>
                                <SearchItemTitle>
                                    {props?.item.name}   
                                </SearchItemTitle>
                            </Link>   
                            <br />
                            <Chip 
                                label={categories.filter((cat) => cat.value === props?.item?.category)[0].name} 
                                component="a" 
                                href={`?${props?.item?.category}`} 
                                clickable />
                            {/* <SearchItemAddress>
                                {props?.item.address}
                            </SearchItemAddress>
                            <SearchItemDescription>
                                <EllipsisText text={props?.item?.details} length={"20"}/>
                            </SearchItemDescription> */}
                        </SearchItemTextSection>
                    </SearchItemDiv>
                </Card>
            </a>

    );
}

export default SearchItem;
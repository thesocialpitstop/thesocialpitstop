import { Card, Chip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import categories from "../../constants/categories";
import { CLOUDFRONT_URL } from "../../constants/constants";
import {
  SearchItemDiv,
  SearchItemImage,
  SearchItemTextSection,
  SearchItemTitle,
} from "./search_item.style";

const SearchItem = (props) => {
  const [src, setSrc] = useState(
    `${CLOUDFRONT_URL}/profile/${props?.item?.objectID}`
  );

  return (
    <a>
      <Card>
        <SearchItemDiv>
          <SearchItemImage>
            <Image
              src={src}
              layout="responsive"
              width={64}
              height={64}
              onError={() =>
                setSrc(`https://ui-avatars.com/api/?name=${props?.item.name}&size=256`)
              }
            ></Image>
          </SearchItemImage>
          <SearchItemTextSection>
            <Link href={`/profile/${props?.item?.objectID}`} passHref>
              <SearchItemTitle>{props?.item.name}</SearchItemTitle>
            </Link>
            <br />
            <Chip
              label={
                categories.filter(
                  (cat) => cat.value === props?.item?.category
                )[0].name
              }
              component="a"
              href={`?category=${props?.item?.category}`}
              clickable
            />
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
};

export default SearchItem;

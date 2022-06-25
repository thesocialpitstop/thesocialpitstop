import { Card } from "@mui/material";
import Link from "next/link";
import PlaceholderLoading from "react-placeholder-loading";
import {
  SearchItemDiv,
  SearchItemTitle,
  SearchItemImage,
  SearchItemDescription,
  SearchItemAddress,
  SearchItemTextSection,
  SearchItemImageSection,
} from "./search_item.style";
const Loader = () => {
  return (
    <Card>
      <SearchItemDiv>
        <SearchItemImage>
          <PlaceholderLoading shape="circle" width={60} height={60} />
        </SearchItemImage>
        <SearchItemTextSection>
          <SearchItemTitle>
            <PlaceholderLoading shape="rect" width={"80%"} height={20} />
          </SearchItemTitle>
          <SearchItemAddress>
            <PlaceholderLoading shape="rect" width={"80%"} height={20} />
          </SearchItemAddress>
          <SearchItemDescription>
            <PlaceholderLoading shape="rect" width={"80%"} height={20} />
          </SearchItemDescription>
        </SearchItemTextSection>
      </SearchItemDiv>
    </Card>
  );
};

export default Loader;

import styled from "styled-components";
import Image from "next/image"
import Link from "next/link";

const SearchItemDiv = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: Montserrat, sans-serif;
`;

const SearchItemTitle = styled.a`
    text-decoration: none;
    font-size: larger;

    :hover {
        color: #7f75ae;
    }
`;
const SearchItemImage = styled.div``;
const SearchItemDescription = styled.div`
`;
const SearchItemAddress = styled.div``;
const SearchItemTextSection = styled.div`
    display: grid;
`;
const SearchItemImageSection = styled(Image)``;


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
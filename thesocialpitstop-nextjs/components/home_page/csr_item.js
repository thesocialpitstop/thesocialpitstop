import Image from "next/image";
import styled from "styled-components";

const CsrItem = (content) => {
    const ItemDiv = styled.div`
        margin: 20px;
        font-family: Montserrat, sans-serif;
        font-size: medium;
        border-radius: 1rem;
        width: 150px;
        transition: 0.2s;
        :hover {
            box-shadow:  20px 20px 60px #bebebe;
        }

    `;
    const Title = styled.div`
        font-size: large;
    `;
    const CustomImage = styled(Image)``;
    const Description = styled.div`
        font-size: smaller;
    `;
    return(
    
    <ItemDiv>
        <Title>
            {content?.item.title}
        </Title>
        <CustomImage 
            src={content?.item.image_url}
            width={128}
            height={128}
            />
        <Description>
            {content?.item.description}
        </Description>
    </ItemDiv>
    
    )
}

export default CsrItem;
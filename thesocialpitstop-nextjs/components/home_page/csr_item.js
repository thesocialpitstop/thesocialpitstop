import { ItemDiv, Title, CustomImage, Description } from "./cst_item.style";

const CsrItem = (content) => {
  return (
    <ItemDiv>
      <Title>{content?.item.title}</Title>
      <CustomImage src={content?.item.image_url} width={128} height={128} />
      <Description>{content?.item.description}</Description>
    </ItemDiv>
  );
};

export default CsrItem;

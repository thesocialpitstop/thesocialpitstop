import Image from "next/image";
import styled from "styled-components";
export const ItemDiv = styled.div`
  margin: 20px;
  font-family: Montserrat, sans-serif;
  font-size: medium;
  border-radius: 1rem;
  width: 150px;
  transition: 0.2s;
  :hover {
    box-shadow: 20px 20px 60px #bebebe;
  }
`;
export const Title = styled.div`
  font-size: large;
`;
export const CustomImage = styled(Image)``;
export const Description = styled.div`
  font-size: smaller;
`;

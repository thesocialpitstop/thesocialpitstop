import styled from "styled-components";
import Image from "next/image";

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;


export const ProfileSection = styled.div`
  &:hover ${DropdownContent} {
    display: block;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    cursor: pointer;
  }
`;


export const ProfileImage = styled(Image)`
  border-radius: 50%;
`;



export const DropdownContentLink = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

`
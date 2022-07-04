import Link from "next/link";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #000C26;
  height: 56px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
  @media screen and (min-width: 768px) {
    justify-content: space-between;
  }
`;

export const NavLogo = styled.a`
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: normal;
  line-height: 32px;
  color: #f0ead6;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
  @media screen and (min-width: 768px) {
    font-size: 24px;
    margin-left: 40px;
  }
  &:hover {
    transition: all 0.2 ease-in-out;
    color: #ffffff;
  }
`;
export const MobileIcon = styled.div`
  position: absolute;
  display: block;
  left: 0;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const SearchIcon = styled.div`
  display: block;
  position: absolute;
  right: 0;
  transform: translate(-90%, 50%);
  font-size: 1.8rem;
  cursor: pointer;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLinks = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    border-bottom: 3px solid #01bf71;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 22px;
  border: 3px solid #f0ead6;
  text-align: center;
  //padding: top right bottom left
  padding: 8px 24px 8px 24px;
  color: #f0ead6;
  display: block;
  position: absolute;
  right: 0;
  transform: translate(-60%, 0%);
  font-size: 1.8rem;
  cursor: pointer;
  color: #fff;
  white-space: nowrap;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.2 ease-in-out;
    background: #f0ead6;
    color: #010606;
  }
`;

export const NavLinkItem = styled.a`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #f0ead6;
  margin-right: 40px;
  &:hover {
    transition: all 0.2 ease-in-out;
    color: #ffffff;
  }
`;

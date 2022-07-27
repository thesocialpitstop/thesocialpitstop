import Link from "next/link";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #fff;
  height: 73px;
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
  align-items: center;

  flex-direction: row;
  z-index: 1;
  width: 100%;
  max-width: 1100px;

  @media screen and (min-width: 768px) {
    justify-content: space-between;
  }
`;

export const NavLogo = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: normal;
  line-height: 32px;
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
  display: flex;
  align-items: center;
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
  justify-content: center;
  gap: 16px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 22px;
  border: 3px solid #f0ead6;
  text-align: center;
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
  &:hover {
    transition: all 0.2 ease-in-out;
    text-decoration: underline;
  }
`;

export const NavButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  background-image: linear-gradient(to right, #4b6cb7 0%, #182848  51%, #4b6cb7  100%);
  margin: 10px;
  padding: 15px 45px;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;            
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  cursor: pointer;
  :hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

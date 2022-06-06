import React from "react";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavBtn,
  NavLinkItem,
} from "./navbar.style";

import { FaBars } from "react-icons/fa";
import { BsUpload, BsSearch } from "react-icons/bs";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const Navbar = ({ toggle }) => {
  const menuId = "main-menu";
  const { user, error, isLoading } = useUser();
  const link = user ? "/api/auth/logout" : "/api/auth/login";
  return (
    <>
      <Nav>
        <NavbarContainer>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavLogo href="/">The Social Pitstop</NavLogo>
          <NavBtn>
            <Link href="/categories" passHref>
              <NavLinkItem>CATEGORIES</NavLinkItem>
            </Link>
            <Link href="/about-us" passHref>
              <NavLinkItem>ABOUT US</NavLinkItem>
            </Link>                        
            <Link href={link} passHref>
              {user ? <NavLinkItem>LOGOUT</NavLinkItem> : <NavLinkItem>LOGIN</NavLinkItem>}
            </Link>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;

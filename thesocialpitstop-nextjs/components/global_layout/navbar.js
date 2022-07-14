import React, { useEffect, useState } from "react";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavBtn,
  NavLinkItem,
} from "./navbar.style";

import Link from "next/link";
import TemporaryDrawer from "./drawer";
import { useUser } from '@auth0/nextjs-auth0';

const Navbar = ({ toggle }) => {
  const menuId = "main-menu";
  const { user, error, isLoading } = useUser();
  const link = user ?  "/api/auth/logout":"/api/auth/login";

  return (
    <>
      <Nav>
        <NavbarContainer>
          <MobileIcon onClick={toggle}>
            <TemporaryDrawer />
          </MobileIcon>
          <NavLogo href="/">The Social Pitstop</NavLogo>
          <NavBtn>
            <Link href="/dashboard" passHref>
              <NavLinkItem>DASHBOARD</NavLinkItem>
            </Link>
            <Link href="/profile" passHref>
              <NavLinkItem>PROFILE</NavLinkItem>
            </Link>
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
import React, { useEffect, useState } from "react";
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
import { Button } from "@mui/material";
import { Configuration, V0alpha2Api } from "@ory/kratos-client";
import { edgeConfig } from "@ory/integrations/next";

const Navbar = ({ toggle }) => {
  const menuId = "main-menu";
  // Contains the current session or undefined.
  const [session, setSession] = useState();

  // The URL we can use to log out.
  const [logoutUrl, setLogoutUrl] = useState('');

  // The error message or undefined.
  const [error, setError] = useState();
  const kratos = new V0alpha2Api(new Configuration(edgeConfig))

  useEffect(() => {
    // If the session or error have been loaded, do nothing.
    if (session || error) {
      return
    }

    // Try to load the session.
    kratos
      .toSession()
      .then(({ data: session }) => {
        // Session loaded successfully! Let's set it.
        setSession(session)

        // Since we have a session, we can also get the logout URL.
        return kratos
          .createSelfServiceLogoutFlowUrlForBrowsers()
          .then(({ data }) => {
            setLogoutUrl(data.logout_url)
          })
      })
      .catch((err) => {
        // An error occurred while loading the session or fetching
        // the logout URL. Let's show that!
        console.log(err);
        setError({
          error: err.toString(),
          data: err.response?.data
        })
      })
  }, [session, error])

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
            {/* <Button onClick={clickFunction}>Button</Button> */}
            <Link href={session ? logoutUrl : '/api/.ory/self-service/login/browser'} passHref>
              {session ? <NavLinkItem>LOGOUT</NavLinkItem> : <NavLinkItem>LOGIN</NavLinkItem>}
            </Link>
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;

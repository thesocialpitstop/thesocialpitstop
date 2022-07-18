import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavBtn,
  NavLinkItem,
  NavLogo,
  NavButton,
} from "./navbar.style";

import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import TemporaryDrawer from "./drawer";
import NavbarUserProfile from "../navbar/navbar_user_profile";

const Navbar = ({ toggle }) => {
  const { user } = useUser();
  const link = user ? "/api/auth/logout" : "/api/auth/login";
  const text = user ? "LOGOUT" : "LOGIN";

  return (
    <>
      <Nav>
        <NavbarContainer>
          <MobileIcon onClick={toggle}>
            <TemporaryDrawer />
          </MobileIcon>
          <NavLogo href="/" passHref>
            <a>
              <Image
                src="https://i.imgur.com/isQOODZ.png"
                width="64"
                height="64"
              />
            </a>
          </NavLogo>
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
          </NavBtn>
          {user == undefined ? <Link href={link} passHref>
            <NavButton>{<NavLinkItem>{text}</NavLinkItem>}</NavButton>
          </Link> : <></>}
          {user == undefined? <></>: 
          <NavbarUserProfile />}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;

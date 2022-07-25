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
import { SOCIAL_PITSTOP_LOGO_URL } from "../../constants/constants";

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
              <Image src={SOCIAL_PITSTOP_LOGO_URL} width="64" height="64" />
            </a>
          </NavLogo>
          <NavBtn>
            <Link href="/categories" passHref>
              <NavLinkItem>CATEGORIES</NavLinkItem>
            </Link>
            <Link href="/about-us" passHref>
              <NavLinkItem>ABOUT US</NavLinkItem>
            </Link>
          </NavBtn>

          {user == undefined ? (
            <a href={link}>
            <NavButton>{text}</NavButton>
          </a>
          ) : (
            
            <></>
          )}
          {user == undefined ? <></> : <NavbarUserProfile />}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;

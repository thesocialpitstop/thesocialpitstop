import { useUser } from "@auth0/nextjs-auth0";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { drawerItems, navbarItems } from "../../constants/drawer_items";
import profileSvg from "../../public/icons/profile.svg";
import { FullWidthButton } from "./shared";
import { UserProfileDiv } from "./drawer.style";
import { MdAccountCircle, MdChildCare, MdExplore, MdList, MdSearch } from "react-icons/md";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);
  const { user, error, isLoading } = useUser();
  const link = user ? "/api/auth/logout" : "/api/auth/login";

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const AuthButton = () => {
    return (
      <Link href={link}>
        <FullWidthButton variant="contained">
          {user ? "Logout" : "Login"}
        </FullWidthButton>
      </Link>
    );
  };

  const loggedInUser = () => {
    return (
      <>
        <Image src={profileSvg} layout="fixed" width={64} height={64} />
        {user.email}
        {AuthButton()}
        <Link href={"/dashboard"} passHref>
          <Button variant="contained">Dashboard</Button>
        </Link>
      </>
    );
  };

  const notLoggedInUser = () => {
    return (
      <Link href={link}>
        <ListItem disablePadding>{AuthButton()}</ListItem>
      </Link>
    );
  };

  const list = () => (
    <Box
      style={{ padding: "30px 20px" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <UserProfileDiv>
        {user ? loggedInUser() : notLoggedInUser()}
      </UserProfileDiv>
      <List>
        {user ? <Link key="Profile" href="/profile">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MdAccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </Link> : <></>}

        <Link key="Explore" href="/search">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MdSearch />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link key="Categories" href="/categories">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MdList />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link key="About Us" href="/aboutus">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MdChildCare />
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon style={{ color: "#000" }} />
        </Button>
        <Drawer
          anchor="left"
          open={state}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: { width: "70%" },
          }}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

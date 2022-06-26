import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import { navbarItems } from "../constants/drawer_items";
import { useUser } from "@auth0/nextjs-auth0";
import { UserProfileDiv } from "./drawer.style";
import { FullWidthButton } from "./shared";
import profileSvg from "../public/icons/profile.svg";

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
        <Image src={profileSvg} layout="fixed" width={64} height={64}/>
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
        {navbarItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon style={{ color: "#FFF" }} />
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

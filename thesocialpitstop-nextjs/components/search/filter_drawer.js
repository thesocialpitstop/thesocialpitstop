import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import Link from 'next/link';
import drawerItems from '../constants/drawer_items';

export default function FilterDrawer() {
  const [state, setState] = React.useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box
        sx={{width: '80%'}}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
    >
    <Link href="/">
        <a>
            <Image src="/../public/icons/logo2.png" alt="asd" width={64} height={64}/>
        </a>
    </Link>
      <List>
        {drawerItems.map((item) => (
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
          <Button onClick={toggleDrawer(true)}><MenuIcon style={{ color: '#FFF' }}/></Button>
          <Drawer
            anchor='left'
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

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import PostsComponent from './components/posts/posts_component';
import ProfileComponent from './components/profile/profile_component';
import { drawerItems } from '../../components/settings/components/posts/drawer_items';

const drawerWidth = 240;

const SettingsDrawer = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [uiState, setUiState] = useState(0);
    const [ui, setUi] = useState();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
      switch(uiState) {
        case 0:
            setUi(<PostsComponent />)
            break;        
        case 1:
            setUi(<ProfileComponent />);
            break;
      }
    }, [uiState])
    

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
            {drawerItems.map((text, index) => (
                <ListItem key={text.name} disablePadding>
                <ListItemButton onClick={() => setUiState(text.uiState)}>
                    <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider />
            <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => setUiState(text.uiState)}>
                    <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
        </div>
        );

        return (
            <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Responsive drawer
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                // container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
              {ui}
            </Box>
          </Box>
        );
    
}

export default SettingsDrawer;
import { AccountBox, Home, Storefront, } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, } from "@mui/material";
import React from 'react'
import { Link } from "react-router-dom";
import PasswordIcon from '@mui/icons-material/Password';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Sidebar = () => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block", backgroundColor: "#FBF9F1" } }}>
    <Box position="fixed" top={100}>
      <List>
        <ListItem disablePadding>
          <Link to="/User" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ padding: '10px' }}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/User/Viewrestaurant" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ padding: '10px' }}>
              <ListItemIcon>
                <Storefront />
              </ListItemIcon>
              <ListItemText primary="Restaurants" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/User/Myprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ padding: '10px' }}>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/User/ViewCart" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ padding: '10px' }}>
              <ListItemIcon>
                <ShoppingCartIcon/>
              </ListItemIcon>
              <ListItemText primary="Cart" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/User/Changepassword" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ padding: '10px' }}>
              <ListItemIcon>
                <PasswordIcon/>
              </ListItemIcon>
              <ListItemText primary="Password" />
            </ListItemButton>
          </Link>
        </ListItem>
        {/* <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon>
              <ModeNight />
            </ListItemIcon>
            <Switch onChange={e => setMode(mode === "light" ? "dark" : "light")} />
          </ListItemButton>
        </ListItem> */}
      </List>
    </Box>
  </Box>
  ) 
}

export default Sidebar
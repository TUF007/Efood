import { AccountBox, Home, Storefront, } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, } from "@mui/material";
import React from 'react'
import { Link } from "react-router-dom";
import PasswordIcon from '@mui/icons-material/Password';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Sidebar = () => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" }, backgroundColor: "#FBF9F1" }}>
      <Box
        position="fixed"
        top={100}
        sx={{
          height: "620px", // Adjust the height according to your needs
          width: "175px", // Adjust the width according to your needs
          borderRadius: "20px",
          border: "1px solid",
          backgroundColor: "#3A3553",
        }}
      >
        <List>
          <ListItem disablePadding>
            <Link to="/User" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ padding: '10px' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Homepage" sx={{ color: 'white' }} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to="/User/Viewrestaurant" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ padding: '10px' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <Storefront />
                </ListItemIcon>
                <ListItemText primary="Restaurants" sx={{ color: 'white' }} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/User/Myprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ padding: '10px' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Profile" sx={{ color: 'white' }} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/User/ViewCart" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ padding: '10px' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Cart" sx={{ color: 'white' }} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/User/Changepassword" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ padding: '10px' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <PasswordIcon />
                </ListItemIcon>
                <ListItemText primary="Password" sx={{ color: 'white' }} />
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
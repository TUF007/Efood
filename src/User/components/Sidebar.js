import { AccountBox, Home, Storefront, } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, } from "@mui/material";
import React from 'react'
import { Link } from "react-router-dom";
import PasswordIcon from '@mui/icons-material/Password';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MailIcon from '@mui/icons-material/Mail';
import FeedbackIcon from '@mui/icons-material/Feedback';
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
            <Link to="/User/Booking" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ padding: '10px' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <InsertChartIcon />
                </ListItemIcon>
                <ListItemText primary="Booking" sx={{ color: 'white' }} />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/User/Liked" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ padding: '10px' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="favorites" sx={{ color: 'white' }} />
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
            <Link to="/User/Editprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ padding: '10px' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <EditIcon/>
                </ListItemIcon>
                <ListItemText primary="Edit Profile" sx={{ color: 'white' }} />
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
          <ListItem disablePadding>
            <Link to="/User/Complaint" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ padding: '10px' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <MailIcon  />
                </ListItemIcon>
                <ListItemText primary="Complaint" sx={{ color: 'white' }} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link to="/User/Feedback" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemButton sx={{ padding: '10px' }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback" sx={{ color: 'white' }} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar
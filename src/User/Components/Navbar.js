import { AppBar, Avatar,  Box, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Bento } from "@mui/icons-material";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../DB/Firebase';


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = ({ setSearch, setSearchRestaurant }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const shouldShowSearchBar = location.pathname !== '/User/Viewrestaurant';
  const UserCollection = collection(db, 'user');
  const [showuser, setShowuser] = useState([]);
  const userid = sessionStorage.getItem('uid')

  const fetchData = async () => {

    const docSnap = await getDocs(query(UserCollection, where("id", "==", userid)));
    if (docSnap.docs.length > 0) {
      const data = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setShowuser(data);
    } else {
      console.log('No such document!');
    }



  }
  useEffect(() => {


    fetchData()
  }, [])

  return (
    <AppBar position="sticky" sx={{ height: "80px", justifyContent: "center", backgroundColor: "#120D31", mb: 2 }}>
    <StyledToolbar>
      <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
        E-FOOD
      </Typography>
      <Bento sx={{ display: { xs: "block", sm: "none" } }} />
      {shouldShowSearchBar ? (
        <Search>
          <InputBase
            placeholder='search...'
            onChange={(event) => setSearch(event.target.value)}
          />
        </Search>
      ) : (
        <Search>
          <InputBase
            placeholder='search...'
            onChange={(event) => setSearchRestaurant(event.target.value)}
          />
        </Search>
      )}
      <Icons>
        {/* <Badge badgeContent={4} color="error">
          <Mail />
        </Badge>
        <Badge badgeContent={2} color="error">
          <Notifications />
        </Badge> */}
        {showuser.map((row, key) => (
          <Avatar
            key={key}
            sx={{ width: 30, height: 30 }}
            src={row.photo}
            onClick={(e) => setOpen(true)}
          />
        ))}
      </Icons>
      {showuser.map((row, key) => (
      <UserBox onClick={(e) => setOpen(true)}>
        <Avatar
          sx={{ width: 30, height: 30 }}
          src={row.photo}
        />
        <Typography variant="span">{row.name}</Typography>
      </UserBox>
      ))}
    </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
    <MenuItem>Logout</MenuItem>
    </Link>
        
      </Menu>
    </AppBar>
  )
}

export default Navbar

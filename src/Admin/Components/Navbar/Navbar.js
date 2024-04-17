import React from 'react'
import "./Navbar.css";
import { Avatar } from '@mui/material';
import image from "../../Logo/admin.png"

const Navbar = () => {
  return (
    <div className="navbar">
       <div className="wrapper" style={{ display: 'flex', justifyContent: 'flex-end' }}>
         
          <div className="item">
          <Avatar src={image}
              className="avatar"
            />
          </div>
        </div>
      </div>
  );
};
export default Navbar
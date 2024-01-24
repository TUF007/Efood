import React from 'react'
import "./Navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { Avatar } from '@mui/material';

const Navbar = () => {
  return (
    <div className="navbar1">
      <div className="wrapper1">
        <div className="search1">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items1">
          <div className="item1">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
         
          <div className="item1">
            <FullscreenExitOutlinedIcon className="icon1" />
          </div>
          <div className="item1">
            <NotificationsNoneOutlinedIcon className="icon1" />
            <div className="counter1">1</div>
          </div>
          <div className="item1">
            <ChatBubbleOutlineOutlinedIcon className="icon1" />
            <div className="counter1">2</div>
          </div>
          <div className="item1">
            <ListOutlinedIcon className="icon1" />
          </div>
          <div className="item1">
          <Avatar src="/broken-image.jpg" 
              className="avatar1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar
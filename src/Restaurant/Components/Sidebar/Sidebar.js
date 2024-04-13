import React from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import TableBarIcon from '@mui/icons-material/TableBar';
import "./Sidebar.css";
import { Avatar } from '@mui/material';
import image from "../Logo/paimon.jpg"
import { Link } from 'react-router-dom';

const Siderbar = () => {
  return (
    <div className='sidebar1'>
      <div className="top1">
        <Avatar className='avatar1' alt="Paimon Logo" src={image} />
        <span className="logo1">E-FOOD</span>
      </div>
      <hr />
      <div className="center1">
        <ul>
          <p className="title1">MAIN</p>
          <Link to={'/Restaurant/Home'} style={{textDecoration:'none'}}>

            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title1"></p>
          <Link to={'/Restaurant/Food'} style={{textDecoration:'none'}}>
          <li>
            <FastfoodIcon className="icon" />
            <span>Food</span>
          </li>
          </Link>
          <Link to={'/Restaurant/Menu'} style={{textDecoration:'none'}}>
          <li>
            <RestaurantMenuIcon className="icon" />
            <span>Menu</span>
          </li>
          </Link>
          <Link to={'/Restaurant/Tables'} style={{textDecoration:'none'}}>
          <li>
            <TableBarIcon  className="icon" />
            <span>Tables</span>
          </li>
          </Link>
         
          <p className="title1">BOOKINGS</p>
          <Link to={'/Restaurant/Booking'} style={{textDecoration:'none'}}>
          <li>
            <InsertChartIcon className="icon" />
            <span>Booking</span>
          </li>
          </Link>
          <p className="title1">REPORTS</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Complaint</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Review</span>
          </li>
      
          <p className="title1">SELF</p>
          <Link to={'/Restaurant/Myprofile'} style={{textDecoration:'none'}}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Edit Profile</span>
          </li>
          
          
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Change password</span>
          </li>
          
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom1">

      </div>
    </div>
  )
}

export default Siderbar
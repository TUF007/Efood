import React from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./Sidebar.css";
import { DarkModeContext } from "../../Context/DarkModeContext";
import { useContext } from "react";
import { Avatar } from '@mui/material';
import image from "../../Logo/paimon.jpg"
import { Link } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PlaceIcon from '@mui/icons-material/Place';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const Siderbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className='sidebar'>
      <div className="top">
      <Avatar className='avatar' alt="Paimon Logo" src={image} />
      <span className="logo">E-FOOD</span>
    </div>
        <hr />
        <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={'/Admin/'} style={{textDecoration:'none'}}>
          <li>
            <DashboardIcon className="icon" />
            <span>Home Page </span>
          </li>
          </Link>
          <Link to={'/Admin/District'} style={{textDecoration:'none'}}>
          <li>
            <PlaceIcon  className="icon" />
            <span>District </span>
          </li>
          </Link>
          <Link to={'/Admin/place'} style={{textDecoration:'none'}}>
          <li>
            <PlaceIcon  className="icon" />
            <span>place </span>
          </li>
          </Link>
          <p className="title">RESTAURANT</p>
          <Link to={'/Admin/Viewrestaurant'} style={{textDecoration:'none'}}>
          <li>
            <StorefrontIcon className="icon" />
            <span>Restaurants </span>
          </li>
          </Link>
          <Link to={'/Admin/foodtype'} style={{textDecoration:'none'}}>
          <li>
            <FastfoodIcon  className="icon" />
            <span>Food type </span>
          </li>
          </Link>
          <Link to={'/Admin/category'} style={{textDecoration:'none'}}>
          <li>
            <FastfoodIcon  className="icon" />
            <span>Category </span>
          </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <CheckBoxOutlineBlankIcon className="icon" />
            <span>Posts</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Reports</span>
          </li>
          <p className="title">REPORTS</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Complaints</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Feedbacks</span>
          </li>
          <p className="title">SELF</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  )
}

export default Siderbar
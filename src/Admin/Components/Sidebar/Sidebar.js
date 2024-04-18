import React from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import MailIcon from '@mui/icons-material/Mail';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FeedbackIcon from '@mui/icons-material/Feedback';
import "./Sidebar.css";
import { Avatar } from '@mui/material';
import image from "../../Logo/paimon.jpg"
import { Link } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PlaceIcon from '@mui/icons-material/Place';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import PersonIcon from '@mui/icons-material/Person';

const Siderbar = () => {
  return (
    <div className='sidebar' >
      <div className="top">
      <Avatar className='avatar' alt="Paimon Logo" src={image} />
      <span className="logo">E-FOOD</span>
    </div>
        <hr />
        <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={'/Admin/Home'} style={{textDecoration:'none'}}>
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
          <Link to={'/Admin/Viewuser'} style={{textDecoration:'none'}}>
          <li>
            <PersonIcon className="icon" />
            <span>Users</span>
          </li>
          </Link>
          <Link to={'/Admin/post'} style={{textDecoration:'none'}}>
          <li>
            <CheckBoxOutlineBlankIcon className="icon" />
            <span>Posts</span>
          </li>
          </Link>
          
          <p className="title">REPORTS</p>
          <Link to={'/Admin/Viewcomplaint'} style={{textDecoration:'none'}}>
          <li>
            <MailIcon  className="icon" />
            <span>Compliants </span>
          </li>
          </Link>
          <Link to={'/Admin/Viewfeedback'} style={{textDecoration:'none'}}>
          <li>
            <FeedbackIcon className="icon" />
            <span>Feedbacks</span>
          </li>
          </Link>
          <p className="title">SELF</p>
          <Link to={'/'} style={{textDecoration:'none'}}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Siderbar
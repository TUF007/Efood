import React, { useEffect, useState } from 'react'
import "./Navbar.css";
import { AppBar, Avatar,  Box, InputBase, Menu, MenuItem, styled, Toolbar, Typography } from '@mui/material'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../DB/Firebase';

const Navbar = () => {

  const RestCollection = collection(db, 'restaurant');
  const [showrest, setShowrest] = useState([]);
  const restid = sessionStorage.getItem('rid')

  const fetchData = async () => {

    const docSnap = await getDocs(query(RestCollection, where("id", "==", restid)));
    if (docSnap.docs.length > 0) {
      const data = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setShowrest(data);
    } else {
      console.log('No such document!');
    }



  }
  useEffect(() => {


    fetchData()
  }, [])
  return (
    <div className="navbar1">
    <div className="wrapper1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div>
        {showrest.map((row, key) => (
          <Avatar
            key={key}
            sx={{ width: 30, height: 30 }}
            src={row.photo}
            className="avatar1"
          />
        ))}
      </div>
    </div>
  </div>
  
  );
};
export default Navbar
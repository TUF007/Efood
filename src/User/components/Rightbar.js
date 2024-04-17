import React, { useEffect, useState } from "react";
import { collection, query, getDocs } from 'firebase/firestore';
import { Paper, Box, Card, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';
import { db } from "../../DB/Firebase";

const Rightbar = () => {
  const [showmenu, setShowmenu] = useState([]);

  const fetchMenu = async () => {
    const menuDocs = await getDocs(query(collection(db, 'menu')));
    const restDocs = await getDocs(query(collection(db, 'restaurant')));

    if (menuDocs.docs.length > 0 && restDocs.docs.length > 0) {
      const menuData = menuDocs.docs.map((doc) => ({
        menuId: doc.id,
        ...doc.data(),
      }));

      const restData = restDocs.docs.map((doc) => ({
        restaurantId: doc.id,
        ...doc.data(),
      }));

      const joinedData = menuData
        .filter((menu) => restData.some((restaurant) => restaurant.restaurantId === menu.restaurant_id))
        .map((menu) => ({
          ...menu,
          restInfo: restData.find((restaurant) => restaurant.restaurantId === menu.restaurant_id),
        }));

      setShowmenu(joinedData);
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const styles = {
    typography: {
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      textAlign:'justified'
    },
    heading: {
      fontSize: '24px',
      marginBottom: '10px',
      color: 'white', /* Adding color property */
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      marginBottom: '10px',
    },
    paragraph: {
      marginTop: '20px',
      color: 'white', /* Adding color property */
    },
    
  };

  return (
    <Box
    flex={2}
    p={2}
    sx={{
      display: { xs: "none", sm: "block" },
      borderRadius: "20px",
      border: "1px solid",
      backgroundColor: "#3A3553",
      height: "590px",
      overflowY: "auto" // or overflowY: "scroll" for always visible scrollbars
    }}
  >
       <h2 style={styles.heading}>Discover Cuisines</h2>
       {showmenu.map((row, key) => (
       <Card position="fixed" width={350} display="flex" flexDirection="column" gap="10px" style={{ borderRadius: "20px", backgroundColor: "#2A2543",marginTop:"20px" }}>
  <div style={styles.typography}>
      <ul style={styles.list} key={key}>
        <li style={{ ...styles.listItem, textAlign: 'center', fontSize: '20px' }}>
          {row.restInfo.name}
        </li>
        <li style={styles.listItem}>
          {row.menu}
        </li>
      </ul> 
  </div>
</Card>
 ))}

      <p style={styles.paragraph}>Experience the essence of cuisines at these authentic restaurants nearby! 🍽️</p>
    </Box>
  );
};

export default Rightbar;

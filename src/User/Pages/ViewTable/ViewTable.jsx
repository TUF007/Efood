import React, { useEffect, useState } from 'react'
// import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Avatar, Box, Button, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { db } from '../../../DB/Firebase';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
const ViewTable = () => {
    const [tables,setTables] = useState([])
    const {Id } = useParams()
    const [showrestaurant, setShowrestaurant] = useState('');

    const fetchRestaurant = async () => {

      const docSnap = await getDocs(query(collection(db, 'restaurant'), where('restaurant_id', '==', Id)));
      if (docSnap.docs.length > 0) {
        const data = docSnap.docs.map((doc) => ({
          propertyId: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        setShowrestaurant(data);
      } else {
        console.log('No such document!');
      }
  
  
  
    }

    const fetchTable = async (Id) => {
        const docSnap = await getDocs(query(collection(db, 'table'), where('restaurant_id', '==', Id)));;

        if (docSnap.docs.length > 0) {
        const tableData = docSnap.docs.map((doc) => ({
            tableId: doc.id,
            ...doc.data(),
          }));

        //   const filteredPosts = tableData.filter((table) =>
        // table.name.toLowerCase().startsWith(searchRestaurant.toLowerCase())
      // );
      console.log(tableData);
      setTables(tableData);
    } else {
      console.log('No such document!');
    }



  }
    useEffect(() => { 
        fetchTable(Id)
        fetchRestaurant()
    },[])
  return (
    <>
   {/* <div>
      {showrestaurant.map((row) => (
        <div key={row.propertyId}>
          <Typography variant="h5" component="div">
            {row.name}
          </Typography>
        </div>
      ))}
    </div> */}
    <Box
    display="flex"
    justifyContent="center"
    marginTop="100px"
  >
    <Grid container spacing={3}>
      {tables.map((row, key) => (
        <Grid key={key + 1} item xs={12} sm={6} md={4}>
          <Card style={{ marginBottom: '20px', width: '100%', height: '500px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <CardContent>
              <Avatar
                src={row.photo}
                style={{ width: '100%', height: '300px', marginBottom: '20px', borderRadius: '0' }}
              />
              <Typography variant="h5" component="div">
                {row.table}
              </Typography>
            </CardContent>
            <Link to={`/User/ViewMenu/`} >

            <Button variant="contained" style={{ marginLeft: '100px' }}>
              Menu<RestaurantMenuIcon />
            </Button>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
  </>
  )
}

export default ViewTable
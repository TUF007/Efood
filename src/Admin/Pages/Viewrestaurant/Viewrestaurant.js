import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../DB/Firebase';
import { Avatar, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
const Viewrestaurant = () => {

  const [showrestaurant, setShowRestaurant] = useState([]);
  useEffect(() => {


    fetchRestaurant()
  }, [])


  
  const fetchRestaurant = async () => {
    const docSnap = await getDocs(query(collection(db, 'restaurant')));
    const docSnap1 = await getDocs(query(collection(db,'place' )));

 if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {
      const placeData = docSnap1.docs.map((doc) => ({
        placeId: doc.id,
        ...doc.data(),
      }));
	 const restaurantData = docSnap.docs.map((doc) => ({
        restaurantId: doc.id,
        ...doc.data(),
      }));
    console.log(docSnap.docs[0].data());

     const joinedData = restaurantData
    .filter((restaurant) => placeData.some((place) => restaurant.place === place.placeId))
    .map((restaurant) => ({
      ...restaurant,
      placeInfo: placeData.find((place) => restaurant.place === place.placeId),
    }));

      console.log(joinedData);
      setShowRestaurant(joinedData);
    } else {
      console.log('No such document!');
    }

 }
 const Deletedata = async (id) => {

  await deleteDoc(doc(db, "restuarant", id));
  fetchRestaurant();
}

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" color="text.secondary" style={{ paddingTop: '20px' }}>
        Restaurants
      </Typography>
    </div>
   <Box
          display="flex"
          justifyContent="center"
          marginTop="100px"

        >
          <Paper style={{ marginBottom: '50px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sl. No.</TableCell>
                    <TableCell>Restaurant</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Photo</TableCell>
                    <TableCell>Place</TableCell>
                    <TableCell align='center' >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showrestaurant.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell><Avatar src={row.photo}/></TableCell>
                      <TableCell>{row.placeInfo.place}</TableCell>
                      <TableCell align='center' ><Button onClick={() => Deletedata(row.propertyId)}>Delete</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        </>
  )
}

export default Viewrestaurant
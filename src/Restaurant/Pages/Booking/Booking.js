import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../DB/Firebase';
import { Avatar, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
const Booking = () => {

  const [showbooking, setShowBooking] = useState([]);
  useEffect(() => {


    fetchBooking()
  }, [])


  
  const fetchBooking = async () => {
    const docSnap = await getDocs(query(collection(db, 'booking')));
    const docSnap1 = await getDocs(query(collection(db, 'user')));
    const docSnap2 = await getDocs(query(collection(db, 'cart')));
    const docSnap3 = await getDocs(query(collection(db, 'food')));

    if (docSnap.docs.length > 0 && docSnap1.docs.length > 0 && docSnap2.docs.length > 0 && docSnap3.docs.length > 0) {
        const userData = docSnap1.docs.map((doc) => ({
            userId: doc.id,
            ...doc.data(),
        }));
        const bookingData = docSnap.docs.map((doc) => ({
            bookingId: doc.id,
            ...doc.data(),
        }));

        const cartData = docSnap2.docs.map((doc) => ({
            cartId: doc.id,
            ...doc.data(),
        }));

        const foodData = docSnap3.docs.map((doc) => ({
            foodId: doc.id,
            ...doc.data(),
        }));

        const joinedData = bookingData
            .filter((booking) => userData.some((user) => booking.userId == user.id))
            .filter((booking) => cartData.some((cart) => booking.bookingId == cart.bookingId))
            .filter((booking) => foodData.some((food) => cartData.some((cart) => cart.foodId == food.foodId)))
            .map((booking) => ({
                ...booking,
                userInfo: userData.find((user) => booking.userId == user.id),
                cartInfo: cartData.find((cart) => booking.bookingId === cart.bookingId),
                foodInfo: foodData.find((food) => cartData.some((cart) => cart.foodId == food.foodId)),
            }));
      console.log(joinedData);
      setShowBooking(joinedData);
    } else {
      console.log('No such document!');
    }

 }
//  const Deletedata = async (id) => {

//   await deleteDoc(doc(db, "restuarant", id));
//   fetchRestaurant();
// }

  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" color="text.secondary" style={{ paddingTop: '20px' }}>
        Booking
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
                    <TableCell>Sl No.</TableCell>
                    <TableCell>User name</TableCell>
                    <TableCell>Food</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Table</TableCell>
                    <TableCell align='center' >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showbooking.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.userInfo.name}</TableCell>
                       <TableCell>{row.foodInfo.name}</TableCell>
                      <TableCell>{row.dateVisit}</TableCell>
                      <TableCell>{row.timeVisit}</TableCell>
                      <TableCell>table no</TableCell>
                      {/* <TableCell align='center' ><Button onClick={() => Deletedata(row.propertyId)}>Delete</Button></TableCell> */}
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

export default Booking

import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../DB/Firebase';
import {  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Booking = () => {

  const [showbooking, setShowBooking] = useState([]);
  const userid = sessionStorage.getItem('uid')
  useEffect(() => {


    fetchBooking()
  }, [])


  
  const fetchBooking = async () => {
    const docSnap = await getDocs(query(collection(db, 'booking')));
    const docSnap1 = await getDocs(query(collection(db, 'user'), where("id", "==", userid)));
    const docSnap2 = await getDocs(query(collection(db, 'cart')));
    const docSnap3 = await getDocs(query(collection(db, 'food')));
    const docSnap4 = await getDocs(query(collection(db, 'table')));

    if (docSnap.docs.length > 0 && docSnap1.docs.length > 0 && docSnap2.docs.length > 0 && docSnap3.docs.length > 0 && docSnap4.docs.length > 0) {
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
        const tableData = docSnap4.docs.map((doc) => ({
          tableId: doc.id,
          ...doc.data(),
      }));


        const joinedData = bookingData
            .filter((booking) => userData.some((user) => booking.userId === user.id))
            .filter((booking) => cartData.some((cart) => booking.bookingId === cart.bookingId))
            .filter((booking) => tableData.some((table) => booking.table === table.tableId))
            .filter((booking) => foodData.some((food) => cartData.some((cart) => cart.foodId === food.foodId)))
            .map((booking) => ({
                ...booking,
                userInfo: userData.find((user) => booking.userId === user.id),
                cartInfo: cartData.find((cart) => booking.bookingId === cart.bookingId),
                tableInfo: tableData.find((table) => booking.table === table.tableId),
                foodInfo: foodData.find((food) => cartData.some((cart) => cart.foodId === food.foodId)),
            }));
      console.log(joinedData);
      setShowBooking(joinedData);
    } else {
      console.log('No such document!');
    }

 }
 const acceptBooking = async (id) => {
  const washingtonRef = doc(db, "booking", id);

// Set the "capital" field of the city 'DC'
await updateDoc(washingtonRef, {
  status: 5
});


  fetchBooking();
}


const rejectBooking = async (id) => {

  const washingtonRef = doc(db, "booking", id);

  // Set the "capital" field of the city 'DC'
  await updateDoc(washingtonRef, {
    status: 4
  });
    fetchBooking();
}
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
                    {/* <TableCell>Food</TableCell> */}
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
                       {/* <TableCell>{row.foodInfo.name}</TableCell> */}
                      <TableCell>{row.dateVisit}</TableCell>
                      <TableCell>{row.timeVisit}</TableCell>
                      <TableCell>{row.tableInfo.table}</TableCell>
                      <TableCell align='center' >
                        
                        {row.status === 3 ? 'Accepted': row.status === 4 ?'Rejected': row.status === 5 ?'Cancel':''}
                        
                        
                       {row.status !=5 ? <Button onClick={() => acceptBooking(row.bookingId)}>Cancel</Button>:''}
                      </TableCell>
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

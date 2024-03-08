import React, { useEffect, useState } from 'react'

import { db } from "../../DB/Firebase";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Avatar, Box, Button, Card, IconButton, Typography, } from "@mui/material";
import CartCard from './CartCard';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Await, Link } from 'react-router-dom';

const ViewCart = () => {

    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');
    const todayStartOfTheDay = today.startOf('day');

    const [CardData, setCartData] = useState([])
    const [check, setCheck] = useState(false)
    const [dateVisit, setDateVisit] = useState('')
    const [timeVist, setTimeVisit] = useState('')


    const Uid = sessionStorage.getItem('uid')

    const fetchFoodForBooking = async () => {
        const BookingCollection = collection(db, 'booking');
        const CartCollection = collection(db, 'cart');
        const FoodCollection = collection(db, 'food'); // Assuming the name of the collection is 'food'

        // Find the booking with status 0 for the specified user
        const existingBookingQuery = query(BookingCollection, where('userId', '==', Uid), where('status', '==', 0));
        const existingBookingSnapshot = await getDocs(existingBookingQuery);

        if (existingBookingSnapshot.size > 0) {
            // If an existing booking is found, get its bookingId
            const existingBooking = existingBookingSnapshot.docs[0];
            const bookingId = existingBooking.id;


            // Fetch all food items associated with the bookingId
            const cartQuery = query(CartCollection, where('bookingId', '==', bookingId));
            const cartSnapshot = await getDocs(cartQuery);

            const foodItems = cartSnapshot.docs.map(async (cartDoc) => {
                const cartData = cartDoc.data();

                // Fetch details of each food item from the 'food' collection
                const foodDoc = await getDoc(doc(FoodCollection, cartData.foodId));

                if (foodDoc.exists()) {
                    const foodData = foodDoc.data();
                    const cartQty = cartData.cartQty || 1; // default to 1 if cartQty is not available

                    // Calculate total cost for each food item
                    const totalCost = foodData.foodPrice * cartQty;
                    return {
                        foodId: cartData.foodId,
                        cartItemId: cartDoc.id,
                        foodDetails: foodData,
                        totalCost
                    };
                }

                return null; // Handle the case where food details are not found
            });

            // Wait for all promises to resolve
            const resolvedFoodItems = await Promise.all(foodItems);
            setCartData(resolvedFoodItems)
            console.log(resolvedFoodItems);


            // return resolvedFoodItems.filter(item => item !== null); // Filter out null values
        } else {
            console.log("No booking with status 0 found");
            return [];
        }
    }

    // const  handleCheckOut = () => {

    // }


    const addDateAndTime = async () => {
        const docRef = doc(db, 'booking');
      
        try {
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            const data = {
              propertyId: docSnap.id,
              ...docSnap.data(),
            };
            console.log(data);
            
            // Add date and time to the data
            const currentDate = new Date();
      
            // Format date and time as needed
            const dateVisit = currentDate.toISOString().split('T')[0];
            const timeVisit = currentDate.toISOString().split('T')[1].slice(0, 5);
      
            const updatedData = {
              ...data,
              dateVisit,
              timeVisit,
              status: 1,
            };
      
            console.log(updatedData);
      
            // Update the document with new data
            await updateDoc(docRef, updatedData);
      
            // Set state with the new values
            setDateVisit(dateVisit);
            setTimeVisit(timeVisit);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error updating document:', error);
        }
      };
      


    useEffect(() => {
        fetchFoodForBooking()
    }, [])

    return (
        <Card position="fixed" width={350} display="flex" flexDirection="column" gap="10px" >
            <Typography variant="h5" fontWeight={500} textAlign={'center'} sx={{ p: 3 }}>
                Cart
            </Typography>
            {
                CardData.map((data, key) => (
                    <CartCard data={data} key={key} fetchFoodForBooking={fetchFoodForBooking} />
                ))
            }
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                <Typography>Total { }</Typography>
                {!check && <Button size='large' sx={{ px: 3 }} onClick={() => setCheck(!check)} variant='contained'>Continue</Button>}
            </Box>



            {check && (
                <>
                    <Box sx={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'DatePicker',
                                    'DateTimePicker',
                                    'TimePicker',
                                    'DateRangePicker',
                                ]}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                    <div style={{ marginTop: "30px" }}>
                                        <DemoItem label="Date">
                                            <DatePicker
                                                sx={{ width: "450px" }}
                                                defaultValue={yesterday}
                                                disablePast
                                                views={['year', 'month', 'day']}
                                                onChange={(event) => setDateVisit(event.format('DD-MM-YYYY'))}
                                            />
                                        </DemoItem>
                                    </div>
                                    <div style={{ marginTop: "30px" }}>
                                        <DemoItem label="Time">
                                            <TimePicker
                                                sx={{ width: "450px" }}
                                                defaultValue={todayStartOfTheDay} disablePast
                                                onChange={(event) => setTimeVisit(event.format('HH:mm:ss'))}

                                            />

                                        </DemoItem>
                                    </div>

                                </div>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Link to={'/User/Payment'}>

                            <Button size='large' sx={{ px: 3, m: 3 }} variant='contained'>Place Order</Button>
                        </Link>
                    </Box>
                </>)}

        </Card>
    )
}

export default ViewCart
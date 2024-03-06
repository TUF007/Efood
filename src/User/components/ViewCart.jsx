import React, { useEffect, useState } from 'react'

import { db } from "../../DB/Firebase";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Avatar, Box, Button, Card, IconButton, Typography, } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import CartCard from './CartCard';
const ViewCart = () => {


    const [CardData, setCartData] = useState([])

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
                   <CartCard data={data} key={key} fetchFoodForBooking={fetchFoodForBooking}/>
                ))
            }
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 3 }}>
                <Typography>Total {}</Typography>
                <Button size='large' sx={{ px: 3 }} variant='contained'>Place Order</Button>
            </Box>
        </Card>
    )
}

export default ViewCart
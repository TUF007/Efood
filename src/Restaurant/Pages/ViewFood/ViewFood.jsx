import React, { useEffect, useState } from 'react';
import { db } from "../../../DB/Firebase";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { Box, Button, Card, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

const ViewFood = () => {
    const {Id} = useParams()
    const [totalCost, setTotalCost] = useState(0);
    const [check, setCheck] = useState(false);
    const [showcart, setShowcart] = useState([]);

    const fetchFoodForBooking = async () => {
        console.log('hi');
        const cartDocs = await getDocs(query(collection(db, 'cart'), where('bookingId', '==', Id)));
        const foodDocs = await getDocs(query(collection(db, 'food')));
          
            if (cartDocs.docs.length > 0 && foodDocs.docs.length > 0) {
              const cartData = cartDocs.docs.map((doc) => ({
                cartId: doc.id,
                ...doc.data(),
              }));
          
              const foodData = foodDocs.docs.map((doc) => ({
                foodId: doc.id,
                ...doc.data(),
              }));
             // console.log(districtData);
          
             const joinedData = cartData
             .filter((food) => foodData.some((cart) => cart.foodId === food.foodId))
             .map((food) => ({
               ...food,
               foodInfo: foodData.find((cart) => cart.foodId === food.foodId),
             }));
        
          
             console.log(joinedData);
              setShowcart(joinedData);
            } else {
              console.log('No such document!');
            }
          };
       

    useEffect(() => {
        fetchFoodForBooking();
    }, []);

    return (
        <Card position="fixed" width={350} display="flex" flexDirection="column" gap="10px">
            <Typography variant="h5" fontWeight={500} textAlign="center" sx={{ p: 3 }}>
                Food
            </Typography>
            {showcart.map((row, key) => (
                <Box key={key} sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                    <Typography variant="h6">{row.foodInfo.name}</Typography>
                    <Typography variant="body1">Price:  ₹{row.foodInfo.foodprice}</Typography>
                    {/* <Typography variant="body1">Total: ${row.data.totalCost}</Typography> */}
                </Box>
            ))}
        </Card>
    );
}


export default ViewFood;


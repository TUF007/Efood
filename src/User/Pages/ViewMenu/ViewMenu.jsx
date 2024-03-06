import React, { useEffect, useState } from 'react'
// import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Avatar, Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { db } from '../../../DB/Firebase';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Link, useParams } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
const ViewMenu = ({fetchFoodForBooking}) => {
    const [showcategory, setShowcategory] = useState([]);
    const [showtype, setShowtype] = useState([]);
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [showfood, setShowfood] = useState([]);
    const Uid = sessionStorage.getItem('uid')

    const fetchCategory = async () => {

        const docSnap = await getDocs(query(collection(db, 'category')));

        if (docSnap.docs.length > 0) {
            const datacategory = docSnap.docs.map((doc) => ({
                propertyId: doc.id,
                ...doc.data(),
            }));
            console.log(datacategory);
            setShowcategory(datacategory);
        } else {
            console.log('No such document!');
        }
    }

    const fetchType = async () => {

        const docSnap = await getDocs(query(collection(db, 'foodtype')));
        const data = docSnap.docs.map((doc) => ({
            propertyId: doc.id,
            ...doc.data(),
        }));
        console.log(data);
        setShowtype(data);




    }
    const fetchFood = async () => {

        const docSnap = await getDocs(query(collection(db, 'food')));
        const docSnap1 = await getDocs(query(collection(db, 'category')));
        const docSnap2 = await getDocs(query(collection(db, 'foodtype')));
        if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {

            const categoryData = docSnap1.docs.map((doc) => ({
                categoryId: doc.id,
                ...doc.data(),
            }));
            const typeData = docSnap2.docs.map((doc) => ({
                typeId: doc.id,
                ...doc.data(),
            }));

            const foodData = docSnap.docs.map((doc) => ({
                foodId: doc.id,
                ...doc.data(),
            }));


            const joinedData = foodData
                .filter((food) => categoryData.some((category) => food.category === category.categoryId))
                .filter((food) => typeData.some((foodtype) => food.type === foodtype.typeId))
                .map((food) => ({
                    ...food,
                    categoryInfo: categoryData.find((category) => food.category === category.categoryId),
                    typeInfo: typeData.find((foodtype) => food.type === foodtype.typeId),
                }));

            setShowfood(joinedData);
        }
        else {
            console.log('No such document!');
        }

    }


    const fetchFoodByType = async (Id) => {

        const docSnap = await getDocs(query(collection(db, 'food')));
        const docSnap1 = await getDocs(query(collection(db, 'category')));
        const docSnap2 = await getDocs(query(collection(db, 'foodtype')));
        if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {

            const categoryData = docSnap1.docs.map((doc) => ({
                categoryId: doc.id,
                ...doc.data(),
            }));
            const typeData = docSnap2.docs.map((doc) => ({
                typeId: doc.id,
                ...doc.data(),
            }));

            const foodData = docSnap.docs.map((doc) => ({
                foodId: doc.id,
                ...doc.data(),
            }));
            let joinedData
            if (category !== "") {
                joinedData = foodData
                    .filter((food) => food.category === category)
                    .filter((food) => food.type === Id)

                    .map((food) => ({
                        ...food,
                        categoryInfo: categoryData.find((category) => food.category === category.categoryId),
                        typeInfo: typeData.find((foodtype) => food.type === foodtype.typeId),
                    }));
            }
            else {
                joinedData = foodData
                    .filter((food) => food.type === Id)

                    .map((food) => ({
                        ...food,
                        categoryInfo: categoryData.find((category) => food.category === category.categoryId),
                        typeInfo: typeData.find((foodtype) => food.type === foodtype.typeId),
                    }));

            }



            setShowfood(joinedData);
        }
        else {
            console.log('No such document!');
        }

    }



    const fetchFoodByCategory = async (Id) => {

        const docSnap = await getDocs(query(collection(db, 'food')));
        const docSnap1 = await getDocs(query(collection(db, 'category')));
        const docSnap2 = await getDocs(query(collection(db, 'foodtype')));
        if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {

            const categoryData = docSnap1.docs.map((doc) => ({
                categoryId: doc.id,
                ...doc.data(),
            }));
            const typeData = docSnap2.docs.map((doc) => ({
                typeId: doc.id,
                ...doc.data(),
            }));

            const foodData = docSnap.docs.map((doc) => ({
                foodId: doc.id,
                ...doc.data(),
            }));
            let joinedData

            if (type !== "") {
                joinedData = foodData
                    .filter((food) => food.category === Id)
                    .filter((food) => food.type === type)


                    .map((food) => ({
                        ...food,
                        categoryInfo: categoryData.find((category) => food.category === category.categoryId),
                        typeInfo: typeData.find((foodtype) => food.type === foodtype.typeId),
                    }));

            }
            else {
                joinedData = foodData
                    .filter((food) => food.category === Id)

                    .map((food) => ({
                        ...food,
                        categoryInfo: categoryData.find((category) => food.category === category.categoryId),
                        typeInfo: typeData.find((foodtype) => food.type === foodtype.typeId),
                    }));
            }


            setShowfood(joinedData);
        }
        else {
            console.log('No such document!');
        }

    }


    const BookingCart = async (Id) => {
        const BookingCollection = collection(db, 'booking');
        const CartCollection = collection(db, 'cart');

        // Check if there is an existing booking with status 0 for the user
        const existingBookingQuery = query(BookingCollection, where('userId', '==', Uid), where('status', '==', 0));
        const existingBookingSnapshot = await getDocs(existingBookingQuery);

        if (existingBookingSnapshot.size > 0) {
            // If an existing booking is found, use its bookingId to add to cart
            const existingBooking = existingBookingSnapshot.docs[0];
            const bookingId = existingBooking.id;

            const cartdata = {
                bookingId: bookingId,
                foodId: Id
            }

            const cartResponse = await addDoc(CartCollection, cartdata);
            console.log(cartResponse);
        } else {
            // If no existing booking is found, create a new booking and add to cart
            const data = {
                userId: Uid,
                status: 0
            }

            const response = await addDoc(BookingCollection, data);

            const cartdata = {
                bookingId: response.id,
                foodId: Id
            }

            const cartResponse = await addDoc(CartCollection, cartdata);
            console.log(cartResponse);
        }
        fetchFoodForBooking()
    }

    useEffect(() => {


        fetchType()
        fetchCategory()
        fetchFood()
    }, [])

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControl fullWidth style={{ borderRadius: '8px', marginRight: '10px' }}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="district-simple-select"
                        value={type}
                        label="Food Type"
                        onChange={(event) => {
                            setType(event.target.value)
                            fetchFoodByType(event.target.value)
                        }}
                        style={{ borderRadius: '8px' }}
                    >
                        {
                            showtype.map((row, key) => (
                                <MenuItem key={key} value={row.propertyId} >{row.foodtype}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <FormControl fullWidth style={{ borderRadius: '8px', marginLeft: '10px' }}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="place-simple-select"
                        value={category}
                        label="Place"
                        onChange={(event) => {
                            setCategory(event.target.value)
                            fetchFoodByCategory(event.target.value)


                        }}
                        style={{ borderRadius: '8px' }}
                    >
                        {
                            showcategory.map((row, key) => (
                                <MenuItem key={key} value={row.propertyId} >{row.category}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
            <Box
                display="flex"
                justifyContent="center"
                marginTop="100px"
            >
                <Grid container spacing={3}>
                    {showfood.map((row, key) => (
                        <Grid key={key + 1} item xs={12} sm={6} md={4}>
                            <Card style={{ marginBottom: '20px', width: '100%', height: '700px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                                <CardContent sx={{ height: '80%' }}>
                                    <Avatar
                                        src={row.photo}
                                        style={{ width: '100%', height: '300px', marginBottom: '20px', borderRadius: '0' }}
                                    />
                                    <Typography variant="h5" component="div">
                                        {row.name}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        {row.description}
                                    </Typography>
                                    <Typography>
                                        Price: {row.foodprice}
                                    </Typography>
                                </CardContent>
                                <Box style={{ display: 'flex', justifyContent: 'center' }}>


                                    <Button variant="contained" sx={{ gap: 2 }} onClick={() => BookingCart(row.foodId)}>
                                        CART<ShoppingCartIcon />
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export default ViewMenu
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

import { db } from "../../DB/Firebase";
import { collection, deleteDoc, doc, getDoc,  updateDoc } from "firebase/firestore";
import { Avatar, Box, Button, Card, IconButton } from "@mui/material";
const CartCard = ({data, fetchFoodForBooking}) => {

    const [cartQty, setCartQty] = useState(1)

    
    const AddCartQty = async (docId) => {
        const CartCollection = collection(db, 'cart');
        const docRef = doc(CartCollection, docId);
    
        try {
            const docSnapshot = await getDoc(docRef);
    
            if (docSnapshot.exists()) {
                // Document exists, get the current cartQty value
                const currentCartQty = docSnapshot.data().cartQty || 1;
                setCartQty(currentCartQty + 1)
    
                // Update the document with the incremented cartQty
                await updateDoc(docRef, {
                    cartQty: currentCartQty + 1
                });
    
                console.log('CartQty updated successfully');
            } else {
                console.log('Document does not exist');
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const RemoveCartQty = async (docId) => {
        const CartCollection = collection(db, 'cart');
        const docRef = doc(CartCollection, docId);
    
        try {
            const docSnapshot = await getDoc(docRef);
    
            if (docSnapshot.exists()) {
                // Document exists, get the current cartQty value
                const currentCartQty = docSnapshot.data().cartQty || 1;
                setCartQty(currentCartQty - 1)
    
                // Update the document with the incremented cartQty
                await updateDoc(docRef, {
                    cartQty: currentCartQty - 1
                });
    
                console.log('CartQty updated successfully');
            } else {
                console.log('Document does not exist');
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const RemoveCart = async(docId) => {
        const CartCollection = collection(db, 'cart');
        const docRef = doc(CartCollection, docId);
    
        try {
            await deleteDoc(docRef);
            fetchFoodForBooking()
            console.log('Document deleted successfully');
        } catch (error) {
            console.error('Error deleting document:', error);
        }
    }

    const FetchCartQty = async (docId) => {
        const CartCollection = collection(db, 'cart');
        const docRef = doc(CartCollection, docId);
    
        try {
            const docSnapshot = await getDoc(docRef);
    
            if (docSnapshot.exists()) {
                // Document exists, get the current cartQty value
                const currentCartQty = docSnapshot.data().cartQty || 1;
                setCartQty(currentCartQty)
    
              
            } else {
                console.log('Document does not exist');
            }
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };


    useEffect(() => {
        FetchCartQty(data.cartItemId)
    },[])
    
    return (
        <Card sx={{ p: 3, backgroundColor: 'lavender', display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <Avatar src={data.foodDetails.photo} />
                <Box>
                    {
                        data.foodDetails.name
                    }
                </Box>
                <Box>
                    {
                        data.foodDetails.foodprice
                    }
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CloseIcon sx={{ fontSize: 12 }} />
                    {
                        cartQty
                    }
                </Box>
            </Box>
            <Button onClick={() => RemoveCart(data.cartItemId)}>Remove</Button>
            <Box>


                <IconButton onClick={() => AddCartQty(data.cartItemId)}><AddIcon /></IconButton>
                <IconButton onClick={() => RemoveCartQty(data.cartItemId)}><RemoveIcon /></IconButton>
            </Box>

        </Card>
    )
}

export default CartCard

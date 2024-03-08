import React, { useEffect, useState } from 'react'
import "./Foodtypestyle.css";
import { db } from '../../../DB/Firebase';
import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import { Paper, Box, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material/';


const Foodtype = () => {


    const FoodtypeCollection = collection(db, 'foodtype');
    const [foodtype, setFoodtype] = useState('');
    const [showfoodtype, setShowfoodtype] = useState([]);
    const [updatefoodtypeID, setupdateFoodtypeID] = useState('');
  

    useEffect(() => {


        fetchData()
    }, [])


    const fetchData = async () => {

        const docSnap = await getDocs(query(collection(db, 'foodtype')));
        const data = docSnap.docs.map((doc) => ({
            propertyId: doc.id,
            ...doc.data(),
        }));
        console.log(data);
        setShowfoodtype(data);




    }

    const InsertData = async (Id) => {
        const data = {
            foodtype,
        }

        if (Id) {
            await updateDoc(doc(db, "foodtype", Id), data);
            fetchData();
            setFoodtype('');
            setupdateFoodtypeID('');
        }
        else {
            const response = await addDoc(FoodtypeCollection, data)
            console.log(response);
            fetchData()
            setFoodtype('');
            setupdateFoodtypeID('');
        }


    }

    const fetchUpdatedata = async (id) => {
        const docRef = doc(db, 'foodtype', id);

        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = {
                    propertyId: docSnap.id,
                    ...docSnap.data(),
                };
                console.log(data);
                const value = data.foodtype;
                const Id = data.propertyId;
                setFoodtype(value);
                console.log(value);
                setupdateFoodtypeID(Id)

            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting document:', error);
        }

    }
    
    const Deletedata = async (id) => {

        await deleteDoc(doc(db, "foodtype", id));
        fetchData();
    }

    return (
        <>
        <Box className='foodtypecontainer'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" color="text.secondary" style={{ paddingTop: '20px' }}>
        Food Type
      </Typography>
    </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={6} className='foodtypepaper' >
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div style={{ marginRight: '25px' }}>
                  <TextField id="outlined-basic" label="Food type" variant="outlined" value={foodtype} onChange={(event) => setFoodtype(event.target.value)} />
                </div>
  
              </Box>
              <div>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" style={{ marginRight: '43px' }} className='foodsub' onClick={() => InsertData(updatefoodtypeID)}>submit</Button>
                </Stack>
              </div>
            </Paper >
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
                      <TableCell>Food Type</TableCell>
                      <TableCell align='center' >Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showfoodtype.map((row, key) => (
                      <TableRow
                        key={key + 1}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {key + 1}
                        </TableCell>
                        <TableCell>{row.foodtype}</TableCell>
                        <TableCell align='center' ><Button onClick={() => Deletedata(row.propertyId)}>Delete</Button>
                          <Button onClick={() => fetchUpdatedata(row.propertyId)}>Update</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
          </Box>
        
  
      </>
    )
}

export default Foodtype
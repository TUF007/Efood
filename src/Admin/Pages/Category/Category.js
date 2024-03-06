import React, { useEffect, useState } from 'react'
import "./Categorystyle.css";
import {db} from '../../../DB/Firebase';
import { collection, addDoc, query, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { Paper, Box, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';


const Category = () => {


  const CategoryCollection = collection(db, 'category');
  const [category, setCategory] = useState('');
  const [showcategory, setShowcategory] = useState([]);


  useEffect(() => {


    fetchData()
  }, [])


  const fetchData = async () => {

    const docSnap = await getDocs(query(collection(db, 'category')));
    if (docSnap.docs.length > 0) {
      const data = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setShowcategory(data);
    } else {
      console.log('No such document!');
    }



  }

  const InsertData = async () => {
    const data = {
      category,
    }

    const response = await addDoc(CategoryCollection, data)
    console.log(response);
    fetchData();
  }

const Deletedata = async(id) => {

  await deleteDoc(doc(db, "category", id));
  fetchData();
}






  return (
    <>
      <Paper elevation={3} className='catcontainer'>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'blue', paddingTop: '50px' }}>
      <h1>Category</h1>
    </div>
<div style={{display:'flex',justifyContent:'center'}}>
        <Paper elevation={6} className='catpaper' >
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ marginRight: '25px' }}>
              <TextField id="outlined-basic" label="Category" variant="outlined" onChange={(event) => setCategory(event.target.value)} />
            </div>

          </Box>
          <div>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" style={{ marginRight: '43px' }} className='catsub' onClick={InsertData}>submit</Button>
            </Stack>
          </div>
        </Paper >
        </div>
        <Box
          display="flex"
          justifyContent="center"
            marginTop="100px"
         
        >
          <Paper>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Sl. No.</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showcategory.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell><Button onClick={()=>Deletedata(row.propertyId)}>Delete</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

      </Paper>

    </>
  )
}

export default Category
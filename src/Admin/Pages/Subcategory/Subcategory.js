import React, { useEffect, useState } from 'react'
import "./Subcategorystyle.css";
import {db} from '../../../DB/Firebase';
import { collection, addDoc, getDocs, query, doc, deleteDoc } from 'firebase/firestore'
import { Paper, Box, TextField, Button, Stack, InputLabel, FormControl, Select, MenuItem, TableContainer, TableCell, Table, TableHead, TableRow, TableBody } from '@mui/material/';

const Subcategory = () => {
  const SubcategoryCollection = collection(db, 'subcategory');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [showcategory, setShowcategory] = useState([]);
  const [showsubcategory, setShowsubcategory] = useState([]);

  const InsertData = async () => {
    const data = {
      category,
      subcategory,
    }
    const response = await addDoc(SubcategoryCollection, data)
    console.log(response);
    fetchSubcategory()
  }


  useEffect(() => {


    fetchCategory()
    fetchSubcategory()
  }, [])


  const fetchCategory = async () => {

    const docSnap = await getDocs(query(collection(db, 'category')));
    console.log(docSnap.docs[0].data());

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

  const fetchSubcategory = async () => {
    const subcategoryDocs = await getDocs(query(collection(db, 'subcategory')));
    const categoryDocs = await getDocs(query(collection(db, 'category')));
  
    if (subcategoryDocs.docs.length > 0 && categoryDocs.docs.length > 0) {
      const subcategoryData = subcategoryDocs.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
  
      const categoryData = categoryDocs.docs.map((doc) => ({
        categoryId: doc.id,
        ...doc.data(),
      }));
     // console.log(categoryData);
  
     const joinedData = subcategoryData
     .filter((subcategory) => categoryData.some((category) => category.categoryId === subcategory.category))
     .map((subcategory) => ({
       ...subcategory,
       categoryInfo: categoryData.find((category) => category.categoryId === subcategory.category).category,
     }));

  
     //console.log(joinedData);
      setShowsubcategory(joinedData);
    } else {
      console.log('No such document!');
    }
  };
  


  const Deletedata = async (id) => {

    await deleteDoc(doc(db, "subcategory", id));
    fetchSubcategory()

  }

  return (
    <Paper elevation={3} className='subcatcontainer'>
      <div style={{display:'flex',justifyContent:'center'}}>
      <Paper elevation={6} className='subcatpaper' >
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {
                showcategory.map((row, key) => (

                  <MenuItem  value={row.propertyId} >{row.category}</MenuItem>

                ))
              }


            </Select>
          </FormControl>
          <div style={{ marginRight: '25px' }} >
          <TextField id="outlined-place" label="subcategory" variant="outlined" onChange={(event) => setSubcategory(event.target.value)} />
         </div>  
        </Box>
        <div>     
        <Stack direction="row" spacing={2}>
          <Button variant="contained" style={{ marginRight: '40px' }} className='subcatsub' onClick={InsertData}>submit</Button>
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
                  <TableCell>category</TableCell>
                  <TableCell>Subcategory</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showsubcategory.map((row, key) => (
                  <TableRow
                    key={key + 1}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{row.categoryInfo}</TableCell>
                    <TableCell>{row.subcategory}</TableCell>
                    <TableCell><Button onClick={() => Deletedata(row.propertyId)}>Delete</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

    </Paper>


  )
}

export default Subcategory
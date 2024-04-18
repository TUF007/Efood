import { Box, Button, Paper, TextField, FormControl, MenuItem, Select, InputLabel, TableBody, TableContainer, Table, TableHead, TableRow, TableCell, Avatar, Typography } from '@mui/material'
import "./Food.css";
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../../DB/Firebase'
import { collection, addDoc, getDocs, query, doc, deleteDoc, where } from 'firebase/firestore'
import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Food = () => {
  const FoodCollection = collection(db, 'food');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState([]);
  const [category, setCategory] = useState('');
  const [type, setType] = useState([]);
  const [foodprice, setFoodprice] = useState([]);
  const [showcategory, setShowcategory] = useState([]);
  const [showtype, setShowtype] = useState([]);
  const [showfood, setShowfood] = useState([]);
  const restid = sessionStorage.getItem('rid');

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  const handlePhotoSelect = (event) => {
    const file1 = event.target.files[0];
    setPhoto(file1);
    console.log(file1);
  };


  const InsertData = async () => {


    const metadata1 = {
      contentType: 'image/jpeg'
    };

    const storageRef1 = ref(storage, 'Food/Photo/' + photo.name);
    await uploadBytesResumable(storageRef1, photo, metadata1);
    const url1 = await getDownloadURL(storageRef1).then((downloadURL) => {
      return downloadURL
    });

    const data = {
      name,
      description,
      photo: url1,
      category,
      type,
      foodprice,
      restaurantId: restid,

    }
    const response = await addDoc(FoodCollection, data)
    console.log(response)
    fetchFood();
  }
  const CancelData = () => {
    setName('')
    setDescription('')
    setPhoto('')
    setCategory('')
    setType('')
    setFoodprice("")
  }

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

    const docSnap = await getDocs(query(collection(db, 'food'), where("restaurantId", "==", restid)));
    const docSnap1 = await getDocs(query(collection(db, 'category')));
    const docSnap2 = await getDocs(query(collection(db, 'foodtype')));
    if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {

      const categoryData = docSnap1.docs.map((doc) => ({
        categoryId: doc.id,
        ...doc.data(),
      }));
      console.log( categoryData);
      const typeData = docSnap2.docs.map((doc) => ({
        typeId: doc.id,
        ...doc.data(),
      }));
      console.log( typeData);

      const foodData = docSnap.docs.map((doc) => ({
        foodId: doc.id,
        ...doc.data(),
      }));

      console.log(foodData);

      const joinedData = foodData
        .filter((food) => categoryData.some((category) => food.category === category.categoryId))
        .filter((food) => typeData.some((foodtype) => food.type === foodtype.typeId))
        .map((food) => ({
          ...food,
          categoryInfo: categoryData.find((category) => food.category === category.categoryId),
          typeInfo: typeData.find((foodtype) => food.type === foodtype.typeId),
        }));
        
      console.log(joinedData);
      setShowfood(joinedData);
  } 
    else {
      console.log('No such document!');
    }

  }
  const Deletedata = async (id) => {

    await deleteDoc(doc(db, "food", id));
    fetchFood()

  }
  useEffect(() => {


    fetchType()
    fetchCategory()
    fetchFood()
  }, [])

  return (
    (
      <>
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" color="text.secondary" style={{ paddingTop: '20px' }}>
        Foods
      </Typography>
    </div>
        <Box className='foodcontainer'>
          <Paper elevation={6} className='foodpaper' >

            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div className='name'>
                <TextField
                  required
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className='Descrip'>
                <TextField
                  required
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
              <div className='proof'>
                <Button component="label" variant="contained" className="photobutton" startIcon={<CloudUploadIcon />} >
                  Upload photo
                  <VisuallyHiddenInput type="file" onChange={handlePhotoSelect} />
                </Button>
              </div>

              <div className='catselect'>
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

                        <MenuItem value={row.propertyId} >{row.category}</MenuItem>

                      ))
                    }


                  </Select>
                </FormControl>
              </div>

              <div className='typeselect'>
                <FormControl fullWidth >
                  <InputLabel id="food-type-simple-select-label">Food Type</InputLabel>
                  <Select
                    labelId="food-type-simple-select-label"
                    id="food-type-simple-select"
                    label="Food Type"
                    onChange={(event) => setType(event.target.value)}
                  >
                    {
                      showtype.map((row, key) => (

                        <MenuItem value={row.propertyId} >{row.foodtype}</MenuItem>

                      ))
                    }

                  </Select>
                </FormControl>
              </div>

              <div className='price'>
                <TextField
                  required
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  onChange={(event) => setFoodprice(event.target.value)}

                />
              </div>
              <div className='sig1div' ><Button variant="contained" type='reset' style={{ marginRight: '10px' }} onClick={() => CancelData()} >cancel</Button>
                <Button variant="contained" onClick={() => InsertData()} >INSERT</Button>
              </div>


            </Box>
          </Paper>


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
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>photo</TableCell>
                      <TableCell>category</TableCell>
                      <TableCell>type</TableCell>
                      <TableCell>price</TableCell>
                      <TableCell align='center' >Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showfood.map((row, key) => (
                      <TableRow
                        key={key + 1}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {key + 1}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell sx={{width:250}}>{row.description}</TableCell>
                        <TableCell><Avatar src={row.photo}/></TableCell>
                        <TableCell>{row.categoryInfo.category}</TableCell>
                        <TableCell>{row.typeInfo.foodtype}</TableCell>
                        <TableCell>{row.foodprice}</TableCell>
                        <TableCell><Button onClick={() => Deletedata(row.propertyId)}>Delete</Button></TableCell>
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
  )
}

export default Food
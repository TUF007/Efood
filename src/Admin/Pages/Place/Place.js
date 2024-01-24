import React, { useEffect, useState } from 'react'
import "./Placestyle.css";
import {db} from '../../../DB/Firebase'
import { collection, addDoc, getDocs, query, doc, deleteDoc } from 'firebase/firestore'
import { Paper, Box, TextField, Button, Stack, InputLabel, FormControl, Select, MenuItem, TableContainer, TableCell, Table, TableHead, TableRow, TableBody } from '@mui/material/';

const Place = () => {
  const PlaceCollection = collection(db, 'place');
  const [district, setDistrict] = useState('');
  const [place, setPlace] = useState('');
  const [showdistrict, setShowdistrict] = useState([]);
  const [showplace, setShowplace] = useState([]);

  const InsertData = async () => {
    const data = {
      district,
      place,
    }
    const response = await addDoc(PlaceCollection, data)
    console.log(response);
    fetchPlace()
  }


  useEffect(() => {


    fetchDistrict()
    fetchPlace()
  }, [])


  const fetchDistrict = async () => {

    const docSnap = await getDocs(query(collection(db, 'district')));
    console.log(docSnap.docs[0].data());

    if (docSnap.docs.length > 0) {
      const datadistrict = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(datadistrict);
      setShowdistrict(datadistrict);
    } else {
      console.log('No such document!');
    }



  }

  const fetchPlace = async () => {
    const placeDocs = await getDocs(query(collection(db, 'place')));
    const districtDocs = await getDocs(query(collection(db, 'district')));
  
    if (placeDocs.docs.length > 0 && districtDocs.docs.length > 0) {
      const placeData = placeDocs.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
  
      const districtData = districtDocs.docs.map((doc) => ({
        districtId: doc.id,
        ...doc.data(),
      }));
     // console.log(districtData);
  
     const joinedData = placeData
     .filter((place) => districtData.some((district) => district.districtId === place.district))
     .map((place) => ({
       ...place,
       districtInfo: districtData.find((district) => district.districtId === place.district).district,
     }));

  
     // console.log(joinedData);
      setShowplace(joinedData);
    } else {
      console.log('No such document!');
    }
  };
  


  const Deletedata = async (id) => {

    await deleteDoc(doc(db, "place", id));
    fetchPlace();
  }

  return (
    <Paper elevation={3} className='placecontainer'>
      <div style={{display:'flex',justifyContent:'center'}}>
      <Paper elevation={6} className='placepaper' >
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="district"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
            >
              {
                showdistrict.map((row, key) => (

                  <MenuItem  value={row.propertyId} >{row.district}</MenuItem>

                ))
              }


            </Select>
          </FormControl>
          <div style={{ marginRight: '25px' }} >
          <TextField id="outlined-place" label="Place" variant="outlined" onChange={(event) => setPlace(event.target.value)} />
         </div>  
        </Box>
        <div>     
        <Stack direction="row" spacing={2}>
          <Button variant="contained" style={{ marginRight: '40px' }} className='placsub' onClick={InsertData}>submit</Button>
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
                  <TableCell>District</TableCell>
                  <TableCell>place</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showplace.map((row, key) => (
                  <TableRow
                    key={key + 1}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{row.districtInfo}</TableCell>
                    <TableCell>{row.place}</TableCell>
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

export default Place
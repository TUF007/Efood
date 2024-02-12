import React, { useEffect, useState } from 'react'
import "./Districtstyle.css";
import {db} from '../../../DB/Firebase';
import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import { Paper, Box, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';


const District = () => {


  const DistrictCollection = collection(db, 'district');
  const [district, setDistrict] = useState('');
  const [showdistrict, setShowdistrict] = useState([]);
  const [updatedistrictID, setupdateDistrictID] = useState('');

  useEffect(() => {


    fetchData()
  }, [])


  const fetchData = async () => {

    const docSnap = await getDocs(query(collection(db, 'district')));
    if (docSnap.docs.length > 0) {
      const data = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setShowdistrict(data);
    } else {
      console.log('No such document!');
    }



  }

  const InsertData = async (Id) => {
    const data = {
      district,
    }

    if (Id) {
      await updateDoc(doc(db, "district", Id), data);
      fetchData();
      setDistrict('');
      setupdateDistrictID('');
    }
    else {
      const response = await addDoc(DistrictCollection, data)
      console.log(response);
      fetchData()
      setDistrict('');
      setupdateDistrictID('');
    }


  }

  const fetchUpdatedata = async (id) => {
    const docRef = doc(db, 'district', id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = {
          propertyId: docSnap.id,
          ...docSnap.data(),
        };
        console.log(data);
        const value = data.district;
        const Id = data.propertyId;
        setDistrict(value);
        setupdateDistrictID(Id)

      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }

  }

  const Deletedata = async (id) => {

    await deleteDoc(doc(db, "district", id));
    fetchData();
  }

  return (
    <>
      <Paper elevation={3} className='distcontainer'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={6} className='distpaper' >
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div style={{ marginRight: '25px' }}>
                <TextField id="outlined-basic" label="District" variant="outlined" value={district} onChange={(event) => setDistrict(event.target.value)} />
              </div>

            </Box>
            <div>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" style={{ marginRight: '43px' }} className='distsub' onClick={() => InsertData(updatedistrictID)}>submit</Button>
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
                    <TableCell>District</TableCell>
                    <TableCell align='center' >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showdistrict.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.district}</TableCell>
                      <TableCell align='center' ><Button onClick={() => Deletedata(row.propertyId)}>Delete</Button>
                        <Button onClick={() => fetchUpdatedata(row.propertyId)}>Update</Button></TableCell>
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

export default District

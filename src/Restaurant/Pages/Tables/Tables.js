import React, { useEffect, useState } from 'react'
import "./Tables.css";
import { db, storage } from '../../../DB/Firebase';
import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import { Paper, Box, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, FormControl } from '@mui/material/';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from 'styled-components';

const Tables = () => {


  const TableCollection = collection(db, 'table');
  const [table, setTable] = useState('');
  const [showtable, setShowtable] = useState([]);
  const [updatetableID, setupdateTableID] = useState('');
  const restid = sessionStorage.getItem('rid');
  const [photo, setPhoto] = useState([]);

  useEffect(() => {


    fetchData()
  }, [])

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
 
  const fetchData = async () => {

    const docSnap = await getDocs(query(collection(db, 'table')));
    if (docSnap.docs.length > 0) {
      const data = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setShowtable(data);
    } else {
      console.log('No such document!');
    }



  }
  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    console.log(file);
  };
  const InsertData = async (Id) => {
    
    const metadata = {
      contentType: 'image/jpeg'
    };
  
    const storageRef = ref(storage, 'Restaurant/Tables/' + photo.name);
    await uploadBytesResumable(storageRef, photo, metadata);
    const url = await getDownloadURL(storageRef).then((downloadURL) => {
      return downloadURL
    });
    const data = {
      table,
      restaurant_id: restid,
      photo: url,
    }

    if (Id) {
      await updateDoc(doc(db, "table", Id), data);
      fetchData();
      setTable('');
      setupdateTableID('');
    }
    else {
      const response = await addDoc(TableCollection, data)
      console.log(response);
      fetchData()
      setTable('');
      setupdateTableID('');
    }


  }

  const fetchUpdatedata = async (id) => {
    const docRef = doc(db, 'table', id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = {
          propertyId: docSnap.id,
          ...docSnap.data(),
        };
        console.log(data);
        const value = data.table;
        const Id = data.propertyId;
        setTable(value);
        setupdateTableID(Id)

      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }

  }

  const Deletedata = async (id) => {

    await deleteDoc(doc(db, "table", id));
    fetchData();
  }

  return (
    <>
      <Paper elevation={3} className='tablecontainer'>
        <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
          <Paper elevation={6} className='tablepaper' >
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
              <FormControl fullWidth >
                <TextField id="outlined-basic" label="Table" variant="outlined"  className='tablenumber' value={table} onChange={(event) => setTable(event.target.value)} />
             </FormControl>
              </div>

            </Box>
            <div>
            <Button component="label" variant="contained" className="tablebutton" startIcon={<CloudUploadIcon />} >
              Upload Table Photo
              <VisuallyHiddenInput type="file" onChange={handlePhotoSelect} />
            </Button>
          </div>
            <div>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" className='tablesub' onClick={() => InsertData(updatetableID)}>submit</Button>
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
                    <TableCell>table</TableCell>
                    <TableCell>Photo</TableCell>
                    <TableCell align='center' >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showtable.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.table}</TableCell>
                      <TableCell><Avatar src={row.photo}/></TableCell>
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

export default Tables
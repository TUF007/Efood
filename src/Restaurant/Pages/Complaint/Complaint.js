import React, { useEffect, useState } from 'react'
import "./Complaint.css";
import { db } from '../../../DB/Firebase';
import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc, getDoc, where } from 'firebase/firestore'
import { Paper, Box, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material/';

const Complaint = () => {
  const ComplaintCollection = collection(db, 'complaint');
  const [complaint, setComplaint] = useState('');
  const [title, setTitle] = useState('');
  const [showcomplaint, setShowcomplaint] = useState([]);
  const [updatecomplaintID, setupdateComplaintID] = useState('');
  const restid = sessionStorage.getItem('rid');

  const fetchData = async () => {

    const docSnap = await getDocs(query(collection(db, 'complaint'),where('restid','==',restid)));
    if (docSnap.docs.length > 0) {
      const data = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setShowcomplaint(data);
    } else {
      console.log('No such document!');
    }



  }

  const InsertData = async (Id) => {
    const data = {
      complaint,
      title,
      restid,
    }

    if (Id) {
      await updateDoc(doc(db, "complaint", Id), data);
      fetchData();
      setComplaint('');
      setTitle('');
      setupdateComplaintID('');
    }
    else {
      const response = await addDoc(ComplaintCollection, data)
      console.log(response);
      fetchData()
      setComplaint('');
      setTitle('');
      setupdateComplaintID('');
    }


  }

  const fetchUpdatedata = async (id) => {
    const docRef = doc(db, 'complaint', id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = {
          propertyId: docSnap.id,
          ...docSnap.data(),
        };
        console.log(data);
        const value = data.complaint;
        const value1 = data.title;
        const Id = data.propertyId;
        setComplaint(value);
        setTitle(value1);
        setupdateComplaintID(Id)

      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }

  }

  const Deletedata = async (id) => {

    await deleteDoc(doc(db, "complaint", id));
    fetchData();
  }
  const CancelData = () => {
    setTitle('')
    setComplaint('')

  }
  useEffect(() => {


    fetchData()
  }, [])
  return (
    <>
      <Paper elevation={3} className='compcontainer'>
        <div className='common'>
          <Paper elevation={6} className='comppaper' >
            <Typography variant="h6" color="text.secondary" style={{ marginBottom: '10px' }}>
              Complaints
            </Typography>

            <div className='title'>
              <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(event) => setTitle(event.target.value)} fullWidth />
            </div>
            <div className='complaint'>
              <TextField
                id="outlined-basic"
                label="Content"
                variant="outlined"
                multiline
                rows={Math.max(6, complaint.split('\n').length)}  
                value={complaint}
                onChange={(event) => setComplaint(event.target.value)}
                fullWidth
                style={{ minHeight: '100px' }} 
              />

            </div>
            <div className='button'>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" className='compsub' onClick={() => InsertData(updatecomplaintID)}>submit</Button>
                <Button variant="contained" onClick={() => CancelData()}>cancel</Button>
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
                    <TableCell>Title</TableCell>
                    <TableCell>Complaint</TableCell>
                    <TableCell align='center' >Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showcomplaint.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.complaint}</TableCell>
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

export default Complaint
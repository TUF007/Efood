import React, { useEffect, useState } from 'react'
import "./Tables.css";
import { db } from '../../../DB/Firebase';
import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import { Paper, Box, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';


const Tables = () => {


  const TableCollection = collection(db, 'table');
  const [table, setTable] = useState('');
  const [showtable, setShowtable] = useState([]);
  const [updatetableID, setupdateTableID] = useState('');

  useEffect(() => {


    fetchData()
  }, [])


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

  const InsertData = async (Id) => {
    const data = {
      table,
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper elevation={6} className='tablepaper' >
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div style={{ marginRight: '25px' }}>
                <TextField id="outlined-basic" label="Table" variant="outlined" value={table} onChange={(event) => setTable(event.target.value)} />
              </div>

            </Box>
            <div>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" style={{ marginRight: '43px' }} className='tablesub' onClick={() => InsertData(updatetableID)}>submit</Button>
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
import React, { useEffect, useState } from 'react'
import { db } from '../../../DB/Firebase';
import { collection,  query, getDocs} from 'firebase/firestore'
import { Paper, Box,   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from '@mui/material/';

const Viewcomplaint = () => {
  const [showcomplaint, setShowcomplaint] = useState([]);

  const fetchData = async () => {

    const docSnap = await getDocs(query(collection(db, 'complaint')));
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

  useEffect(() => {


    fetchData()
  }, [])
  return (
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
                      <TableCell>reply</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
  )
}

export default Viewcomplaint
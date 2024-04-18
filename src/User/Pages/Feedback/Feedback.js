import React, { useEffect, useState } from 'react';
import "./Feedback.css";
import { db } from '../../../DB/Firebase';
import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc, getDoc, where } from 'firebase/firestore';
import { Paper, Box, TextField, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material/';

const Feedback = () => {
  const FeedbackCollection = collection(db, 'feedback');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState([]);
  const [updateFeedbackID, setUpdateFeedbackID] = useState('');
  const userId = sessionStorage.getItem('uid');

  const fetchData = async () => {
    const docSnap = await getDocs(query(collection(db, 'feedback'), where("userId", "==", userId)));
    if (docSnap.docs.length > 0) {
      const data = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        feedback: doc.data().feedback, // Corrected to access the feedback field from document data
      }));
      setShowFeedback(data);
    } else {
      console.log('No such document!');
    }
  }
  

  const insertData = async (id) => {
    const data = {
      feedback,
      userId,
    };

    if (id) {
      await updateDoc(doc(db, "feedback", id), data);
      fetchData();
      setFeedback('');
      setUpdateFeedbackID('');
    } else {
      const response = await addDoc(FeedbackCollection, data);
      console.log(response);
      fetchData();
      setFeedback('');
      setUpdateFeedbackID('');
    }
  }

  const fetchUpdateData = async (id) => {
    const docRef = doc(db, 'feedback', id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = {
          propertyId: docSnap.id,
          ...docSnap.data(),
        };
        const value = data.feedback;
        const Id = data.propertyId;
        setFeedback(value);
        setUpdateFeedbackID(Id);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  }

  const deleteData = async (id) => {
    await deleteDoc(doc(db, "feedback", id));
    fetchData();
  }

  const cancelData = () => {
    setFeedback('');
    setUpdateFeedbackID('');
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Paper elevation={6} className='comppaper1' style={{ backgroundColor: '#FBF9F1' }}>
        <Typography variant="h6" color="text.secondary" style={{ marginBottom: '10px' }}>
          Feedbacks
        </Typography>
        <div className='feedback'>
          <TextField
            id="outlined-basic"
            label="Content"
            variant="outlined"
            multiline
            rows={Math.max(6, feedback.split('\n').length)}
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            fullWidth
            style={{ minHeight: '100px' }}
          />
        </div>
        <div className='button1'>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" className='compsub1' onClick={() => insertData(updateFeedbackID || undefined)}>submit</Button>
            <Button variant="contained" onClick={() => cancelData()}>cancel</Button>
          </Stack>
        </div>
      </Paper>
      <Box
        display="flex"
        justifyContent="center"
        marginTop="100px"
      >
        <Paper style={{ marginBottom: '50px' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor: '#FBF9F1' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl. No.</TableCell>
                  <TableCell>Feedback</TableCell>
                  <TableCell align='center'>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showFeedback.map((row, key) => (
                  <TableRow
                    key={key + 1}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key + 1}
                    </TableCell>
                    <TableCell>{row.feedback}</TableCell>
                    <TableCell align='center'>
                      <Button onClick={() => deleteData(row.propertyId)}>Delete</Button>
                      <Button onClick={() => fetchUpdateData(row.propertyId)}>Update</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default Feedback;


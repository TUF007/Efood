import React, { useEffect, useState } from 'react'
import { db } from '../../../DB/Firebase';
import { collection,  query, getDocs} from 'firebase/firestore'
import { Paper, Box,   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,} from '@mui/material/';

const Viewfeedback = () => {
  const [showfeedbackuser, setShowfeedbackuser] = useState([]);
  const [showfeedbackrest, setShowfeedbackrest] = useState([]);

  const fetchFeedbackuser = async () => {
    const docSnap = await getDocs(query(collection(db, 'feedback')));
    const docSnap1 = await getDocs(query(collection(db,'user' )));

 if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {
      const userData = docSnap1.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
      }));
	 const feedbackData = docSnap.docs.map((doc) => ({
        FeedbackId: doc.id,
        ...doc.data(),
      }));
    console.log(docSnap.docs[0].data());

     const joinedData = feedbackData
    .filter((feedback) => userData.some((user) => feedback.userId=== user.userId))
    .map((feedback) => ({
      ...feedback,
      userInfo: userData.find((user) => feedback.userId === user.userId),
    }));

      console.log(joinedData);
      setShowfeedbackuser(joinedData);
    } else {
      console.log('No such document!');
    }

 }

 const fetchFeedbackrest = async () => {
  const docSnap = await getDocs(query(collection(db, 'feedback')));
  const docSnap1 = await getDocs(query(collection(db,'restaurant' )));

if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {
    const restData = docSnap1.docs.map((doc) => ({
      restId: doc.id,
      ...doc.data(),
    }));
 const feedbackData = docSnap.docs.map((doc) => ({
   FeedbackId: doc.id,
      ...doc.data(),
    }));
 console.log(docSnap.docs[0].data());

  const joinedData = feedbackData
 .filter((feedback) => restData.some((restaurant) => feedback.restId=== restaurant.restId))
 .map((feedback) => ({
   ...feedback,
   restInfo: restData.find((restaurant) => feedback.restId=== restaurant.restId),
 }));

   console.log(joinedData);
   setShowfeedbackrest(joinedData);
 } else {
   console.log('No such document!');
 }

};

useEffect(() => {


    fetchFeedbackuser()
    fetchFeedbackrest()
  }, [])
  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" color="text.secondary" style={{ paddingTop: '20px' }}>
        feedbacks-User
      </Typography>
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
                    <TableCell>User Name</TableCell>
                    <TableCell>Feedback</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showfeedbackuser.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.userInfo.name}</TableCell>
                      <TableCell>{row.feedback}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" color="text.secondary" style={{ paddingTop: '20px' }}>
        feedbacks-Restaurant
      </Typography>
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
                    <TableCell>Restaurant Name</TableCell>
                    <TableCell>Feedback</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showfeedbackrest.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.restInfo.name}</TableCell>
                      <TableCell>{row.feedback}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        </>
  )
}

export default Viewfeedback
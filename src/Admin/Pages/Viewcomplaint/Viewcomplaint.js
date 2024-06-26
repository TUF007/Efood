import React, { useEffect, useState } from 'react'
import { db } from '../../../DB/Firebase';
import { collection,  query, getDocs} from 'firebase/firestore'
import { Paper, Box,   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,} from '@mui/material/';

const Viewcomplaint = () => {
  const [showcomplaintuser, setShowcomplaintuser] = useState([]);
  const [showcomplaintrest, setShowcomplaintrest] = useState([]);

  const fetchComplaintuser = async () => {
    const docSnap = await getDocs(query(collection(db, 'complaint')));
    const docSnap1 = await getDocs(query(collection(db,'user' )));

 if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {
      const userData = docSnap1.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
      }));
	 const ComplaintData = docSnap.docs.map((doc) => ({
        ComplaintId: doc.id,
        ...doc.data(),
      }));
    console.log(docSnap.docs[0].data());

     const joinedData = ComplaintData
    .filter((complaint) => userData.some((user) => complaint.userid === user.userId))
    .map((complaint) => ({
      ...complaint,
      userInfo: userData.find((user) => complaint.userid === user.userId),
    }));

      console.log(joinedData);
      setShowcomplaintuser(joinedData);
    } else {
      console.log('No such document!');
    }

 }

 const fetchComplaintrest = async () => {
  const docSnap = await getDocs(query(collection(db, 'complaint')));
  const docSnap1 = await getDocs(query(collection(db,'restaurant' )));

if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {
    const restaurantData = docSnap1.docs.map((doc) => ({
      restId: doc.id,
      ...doc.data(),
    }));
 const ComplaintData = docSnap.docs.map((doc) => ({
      ComplaintId: doc.id,
      ...doc.data(),
    }));
  console.log(docSnap.docs[0].data());

   const joinedData = ComplaintData
  .filter((complaint) => restaurantData.some((restaurant) => complaint.restid === restaurant.restId))
  .map((complaint) => ({
    ...complaint,
    restInfo: restaurantData.find((restaurant) => complaint.restid === restaurant.restId),
  }));

    console.log(joinedData);
    setShowcomplaintrest(joinedData);
  } else {
    console.log('No such document!');
  }

}
  useEffect(() => {


    fetchComplaintuser()
    fetchComplaintrest()
  }, [])
  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" color="text.secondary" style={{ paddingTop: '20px' }}>
        Complaints-User
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
                    <TableCell>Title</TableCell>
                    <TableCell>Complaint</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showcomplaintuser.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.userInfo.name}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.complaint}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" color="text.secondary" style={{ paddingTop: '20px' }}>
        Complaints-Restaurant
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
                    <TableCell>Title</TableCell>
                    <TableCell>Complaint</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showcomplaintrest.map((row, key) => (
                    <TableRow
                      key={key + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {key + 1}
                      </TableCell>
                      <TableCell>{row.restInfo.name}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.complaint}</TableCell>
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

export default Viewcomplaint
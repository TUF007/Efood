import { Box, Button, TextField } from '@mui/material'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import {  auth} from '../../../DB/Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const Changepassword = () => {
  const userid = sessionStorage.getItem('uid');
  const [email, setEmail] = useState('');
 

  const InsertData = async () => {

    sendPasswordResetEmail(auth, email)
      .then(() => {
       alert('Password reset email sent!')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

 
  }

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "35rem",
      height: "30rem",
      margin: "auto",
      marginTop: "40px",
      border: "1px solid black",
      borderRadius: "10px",
    }}>
      <Box sx={{
        fontSize: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "120px",
        mt: "120px"
      }}>
        <h1 style={{ fontSize: "40px", marginBottom: "50px" }}>Change Password</h1>

        <h1 style={{ fontSize: "18px" }}>Email</h1>
        <TextField id="outlined-basic" sx={{ width: 500, maxWidth: '100%', }} variant="outlined" type="Email" onChange={(event) => setEmail(event.target.value)} />

       <Box sx={{
          display: "flex",
          mt: "20px",
          justifyContent: "center",
        }}>
          <Button variant="contained" sx={{ width: "120px", height: "40px", borderRadius: "20px", '&:hover': { backgroundColor: "darkblue", transform: 'scale(1.05)' } }} onClick={InsertData}>Submit</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Changepassword
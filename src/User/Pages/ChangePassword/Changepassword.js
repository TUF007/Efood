import { Box, Button, TextField } from '@mui/material'
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../DB/Firebase';

const Changepassword = () => {
  const userid = sessionStorage.getItem('uid');
  const [password, setPassword] = useState('');
  const [newpasword, setNewpassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [updatepasswordID, setupdatePasswordID] = useState('');

  const InsertData = async () => {



    const docRef = doc(db, "user", userid);
    const docSnap = await getDoc(docRef);
    if (docSnap.data().password == password) {
      if (newpasword == repassword) {
        console.log('hi');

        await updateDoc(docRef, {
          "password": password,
      });
      
      }
    }





    setPassword('');
    setupdatePasswordID('');
  }

  // const fetchUpdatedata = async (id) => {
  //     const docRef = doc(db, 'user', id);

  //     try {
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         const data = {
  //           propertyId: docSnap.id,
  //           ...docSnap.data(),
  //         };
  //         console.log(data);
  //         const value = data.password;
  //         const Id = data.propertyId;
  //         setPassword(value);
  //         setupdatePasswordID(Id)

  //       } else {
  //         console.log('No such document!');
  //       }
  //     } catch (error) {
  //       console.error('Error getting document:', error);
  //     }

  //   }
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      width: "40rem",
      height: "40rem",
      margin: "auto",
      marginTop: "40px",
      border: "1px solid black",
      backgroundColor: "#FBF9F1",
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

        <h1 style={{ fontSize: "18px" }}>Current Password</h1>
        <TextField id="outlined-basic" sx={{ width: 500, maxWidth: '100%', }} variant="outlined" type="password" onChange={(event) => setPassword(event.target.value)} />

        <h1 style={{ fontSize: "18px" }}>New Password</h1>
        <TextField id="outlined-basic" sx={{ width: 500, maxWidth: '100%', }} variant="outlined" type="password" onChange={(event) => setNewpassword(event.target.value)} />

        <h1 style={{ fontSize: "18px", }}>Re-Password</h1>
        <TextField id="outlined-basic" sx={{ width: 500, maxWidth: '100%', }} variant="outlined" type="password" onChange={(event) => setRepassword(event.target.value)} />
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
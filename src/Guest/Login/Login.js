import { Box, Button, Paper, TextField,Typography } from '@mui/material'
import React, { useState } from 'react'
import "./Login.css";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../DB/Firebase'
import { collection, doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()

  const UserCollection = collection(db, 'user');
  const ResturantCollection = collection(db, 'restaurant');
  const AdminCollection = collection(db, 'admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const InsertData = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const Id = userCredential.user.uid;
  
      const docRef1 = doc(UserCollection, Id);
      const docSnap1 = await getDoc(docRef1);
  
  
      const docRef2 = doc(ResturantCollection, Id);
      const docSnap2 = await getDoc(docRef2);

      
      const docRef3 = doc(AdminCollection, Id);
      const docSnap3 = await getDoc(docRef3);
      
      console.log(docSnap2);
      if (docSnap1.exists()) {
        sessionStorage.setItem("uid",Id)
        navigate('../../User')
      }
      else if(docSnap2.exists() ){
        sessionStorage.setItem("rid",Id)
        navigate('../../Restaurant')
      }
      else if(docSnap3.exists() ){
        sessionStorage.setItem("aid",Id)
        navigate('../../Admin')
      }
      else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      if(errorCode === "auth/email-already-in-use")
      {
        alert("Already Exist")
      }
    }


   



  }
  return (
    <Paper elevation={3} className='logcontainer'>
    <Paper elevation={6} className='logpaper'>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className='login'>LOGIN</div>
        <div className='email'>
          <TextField
            required
            id="standard-basic"
            label="Email"
            variant="standard"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='password'>
          <TextField
            required
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className='sigdiv'>
          <Button variant="contained" className='sigbutton' onClick={InsertData}>sign in</Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
  <Typography fontSize="sm">
    Don't have an account? <Link  to={'/Userregistration'}>Sign up</Link>
  </Typography>
  <Typography fontSize="sm">
    Not a user? <Link  to={'/Restregistration'}>Sign up</Link>
  </Typography>
</div>

      </Box>
    </Paper>
  </Paper>
  
  )
}

export default Login
import { Box, Button, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material'
import "./Userregistration.css";
import React, { useEffect, useState } from 'react'
import { db, storage, auth } from '../../DB/Firebase'
import { collection,  getDocs, query, where, doc, setDoc } from 'firebase/firestore'
import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {  createUserWithEmailAndPassword } from "firebase/auth";





const Userregistration = () => {




  const UserCollection = collection(db, 'user');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [district, setDistrict] = useState('');
  const [showdistrict, setShowDistrict] = useState([]);
  const [place, setPlace] = useState('');
  const [showplace, setShowPlace] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [bio, setBio] = useState('');
  const [no, setNo] = useState('');





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


  const handleProofSelect = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    console.log(file);
  };


  const InsertData = async () => {

    if (!name || !email || !password || !age || !gender || !district || !place || !photo || !bio || !no) {
      alert("Please fill in all required fields.");
      return;
    }


    if (no.length !== 10 || isNaN(Number(no))) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }


    try {
      const metadata = {
        contentType: 'image/jpeg'
      };
  
      const storageRef = ref(storage, 'User/Photo' + photo.name);
  
      await uploadBytesResumable(storageRef, photo, metadata);
      const url = await getDownloadURL(storageRef).then((downloadURL) => {
        return downloadURL
      });
  
      await createUserWithEmailAndPassword(auth, email, password);
      const uid = auth.currentUser.uid;
      console.log(uid);
  
      await setDoc(doc(UserCollection,uid), {
        id: uid,
        name,
        age,
        gender,
        password,
        place,
        email,
        photo: url,
        bio,
        no,
      });
      alert("Profile created successfully!");
            
      
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
  const CancelData = () => {
    
    setName('')
    setPassword('')
    setAge('')
    setGender('')
    setDistrict('')
    setBio('')
    setNo('')
    setPlace('')
  }

  const fetchDistrict = async () => {

    const docSnap = await getDocs(query(collection(db, 'district')));
    console.log(docSnap.docs[0].data());

    if (docSnap.docs.length > 0) {
      const datadistrict = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(datadistrict);
      setShowDistrict(datadistrict);
    } else {
      console.log('No such document!');
    }



  }

  const fetchPlace = async (id) => {
    const placeDocs = await getDocs(query(collection(db, 'place'), where('district', '==', id)));

    if (placeDocs.docs.length > 0) {
      const dataplace = placeDocs.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(dataplace);
      setShowPlace(dataplace);
    } else {
      console.log('No such document!');
    }



  }


  

  useEffect(() => {


    fetchDistrict()
  }, [])



  return (
    <Paper elevation={3} className='regcontainer'>
      <Paper elevation={6} className='regpaper' >

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className='user'>USER REGISTRATION</div>
          <div className='firstname'>
            <TextField
              required
              id="standard-required"
              label="Name"
              type='text'
              variant="standard"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          {/* <div className='name'>
            <TextField
              required
              id="standard-required"
              label="Last Name"
              type='text'
              variant="standard"
              onChange={(event) => setLast(event.target.value)}
            />
          </div> */}
          <div className='email'>
            <TextField
              required
              id="standard-required"
              label="email"
              type='email'
              variant="standard"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className='bio'>
            <TextField
              required
              id="standard-required"
              label="Bio"
              type='text'
              variant="standard"
              onChange={(event) => setBio(event.target.value)}
            />
          </div>
          <div className='age'>
            <TextField
              required
              id="standard-required"
              label="age"
              type='int'
              variant="standard"
              onChange={(event) => setAge(event.target.value)}
            />
          </div>
          <div className='Num'>
            <TextField
              required
              id="standard-required"
              label="Phone No"
              type='int'
              variant="standard"
              onChange={(event) => setNo(event.target.value)}
            />
          </div>
          <div className='gender'>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" style={{ marginLeft: '15px' }} control={<Radio />} label="Female" onClick={(event) => setGender(event.target.value)} />
                <FormControlLabel value="male" style={{ marginLeft: '15px' }} control={<Radio />} label="Male" onClick={(event) => setGender(event.target.value)} />
                <FormControlLabel value="other" style={{ marginLeft: '15px' }} control={<Radio />} label="Other" onClick={(event) => setGender(event.target.value)} />
              </RadioGroup>
            </FormControl>
          </div>
          <div className='proof'>
            <Button component="label" variant="contained" className="proofbutton" startIcon={<CloudUploadIcon />} >
              Upload Profile 
              <VisuallyHiddenInput type="file" onChange={handleProofSelect} />
            </Button>
          </div>
          <div className='distselect'>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="district-simple-select"
                value={district}
                label="District"
                onChange={(event) => {
                  fetchPlace(event.target.value)
                  setDistrict(event.target.value)
                }}
              >
                {
                  showdistrict.map((row, key) => (

                    <MenuItem key={key} value={row.propertyId} >{row.district}</MenuItem>

                  ))
                }

              </Select>
            </FormControl>
          </div>
          <div className='placeselect'>
            <FormControl fullWidth variant="standard" >
              <InputLabel id="demo-simple-select-label">Place</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="place-simple-select"
                value={place}
                label="Place"
                onChange={(event) => { setPlace(event.target.value) }}
              >
                {
                  showplace.map((row, key) => (

                    <MenuItem key={key} value={row.propertyId} >{row.place}</MenuItem>

                  ))
                }
              </Select>
            </FormControl>
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
          <div className='conpassword'>
            <TextField
              required
              id="standard-password-input"
              label="Re-Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
          </div>
          <div className='sig1div' ><Button variant="contained" type='reset' style={{ marginRight: '10px' }} onClick={CancelData}>cancel</Button>
            <Button variant="contained" onClick={InsertData} >sign up</Button>
          </div>


        </Box>
      </Paper>
    </Paper>
  )
}

export default Userregistration
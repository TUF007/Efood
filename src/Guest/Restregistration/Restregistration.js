import { Box, Button, Paper, TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material'
import "././Restregistration.css";
import React, { useEffect, useState } from 'react'
import { db, storage, auth } from '../../DB/Firebase'
import { collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore'
import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Restaurantregistration = () => {
    const RestaurantCollection = collection(db, 'restaurant');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [district, setDistrict] = useState('');
    const [showdistrict, setShowDistrict] = useState([]);
    const [place, setPlace] = useState('');
    const [showplace, setShowPlace] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [proof, setProof] = useState([]);

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


    const handlePhotoSelect = (event) => {
        const file1 = event.target.files[0];
        setPhoto(file1);
        console.log(file1);
    };
    const handleProofSelect = (event) => {
        const file2 = event.target.files[0];
        setProof(file2);
        console.log(file2);
    };

    
    const InsertData = async () => {
        
        try {
            const metadata1 = {
                  contentType: 'image/jpeg'
              };
      
              const storageRef1 = ref(storage, 'Restaurant/Photo/' + photo.name);
      
              await uploadBytesResumable(storageRef1, photo, metadata1);
              const url1 = await getDownloadURL(storageRef1).then((downloadURL) => {
                  return downloadURL
              });
              const metadata2 = {
                contentType: 'image/jpeg'
            };
              const storageRef2 = ref(storage, 'Restaurant/Proof/' + proof.name);
      
              await uploadBytesResumable(storageRef2, proof, metadata2);
              const url2 = await getDownloadURL(storageRef2).then((downloadURL) => {
                  return downloadURL
              });
            await createUserWithEmailAndPassword(auth, email, password);
            const uid = auth.currentUser.uid;
            console.log(uid);
        
            await setDoc(doc(RestaurantCollection,uid), {
                  name,
                  password,
                  place,
                  email,
                  photo: url1,
                  proof: url2,
                  id: uid,
            });
            
            
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
        setEmail('')
        setProof('')
        setDistrict('')
        setPhoto("")
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
        (
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
                        <div className='user'>RESTAURANT REGISTRATION</div>
                        <div className='name'>
                            <TextField
                                required
                                id="standard-required"
                                label="Name"
                                type='text'
                                variant="standard"
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className='email'>
                            <TextField
                                required
                                id="standard-required"
                                label="Email"
                                type='email'
                                variant="standard"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='photo'>
                            <Button component="label" variant="contained" className="photobutton" startIcon={<CloudUploadIcon />} >
                                Upload photo
                                <VisuallyHiddenInput type="file" onChange={handlePhotoSelect} />
                            </Button>
                        </div>
                        <div className='proof'>
                            <Button component="label" variant="contained" className="proofbutton" startIcon={<CloudUploadIcon />} >
                                Upload Proof
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
                            <Button variant="contained" onClick={InsertData} >sign in</Button>
                        </div>


                    </Box>
                </Paper>
            </Paper>
        )
    )
}

export default Restaurantregistration
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { db } from '../../../DB/Firebase';
import { doc, updateDoc } from 'firebase/firestore';

const Editprofile = () => {
  const userid = sessionStorage.getItem('uid');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [no, setNo] = useState('');

  const updateProfile = async () => {
    const data = {
      name,
      bio,
      no,
    };

    await updateDoc(doc(db, 'user', userid), data);
    // Display alert after updating profile
    alert('Profile Updated');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '650px',
        height: '600px',
        margin: 'auto',
        marginTop: '40px',
        border: '1px solid black',
        boxShadow: '7px',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          fontSize: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginBottom: '120px',
          mt: '120px',
        }}
      >
        <Typography variant="h4" color="text.secondary" style={{ marginBottom: '50px' }}>
          Edit Profile
        </Typography>

        <h1 style={{ fontSize: '18px' }}>Name</h1>
        <TextField
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: 500, maxWidth: '100%' }}
          variant="outlined"
        />

        <h1 style={{ fontSize: '18px' }}>Bio</h1>
        <TextField
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          sx={{ width: 500, maxWidth: '100%' }}
          variant="outlined"
        />

        <h1 style={{ fontSize: '18px' }}>Phone no</h1>
        <TextField
          id="phone"
          value={no}
          onChange={(e) => setNo(e.target.value)}
          sx={{ width: 500, maxWidth: '100%' }}
          variant="outlined"
        />

        <Box sx={{ display: 'flex', mt: '20px', justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{ width: '120px', height: '40px', borderRadius: '20px', '&:hover': { backgroundColor: 'darkblue', transform: 'scale(1.05)' } }}
            onClick={updateProfile}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Editprofile;





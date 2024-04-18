import { CardActions, IconButton, Typography, Avatar, Grid, Card, CardContent, Box } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../../DB/Firebase";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

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

const Myprofile = () => {
  const [showuser, setShowuser] = useState([]);
  const [showpost, setShowpost] = useState([]);
  const userid = sessionStorage.getItem('uid')
  const fetchData = async () => {

    const docSnap = await getDocs(query(collection(db, 'user'), where("id", "==", userid)));
    if (docSnap.docs.length > 0) {
      const data = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setShowuser(data);
    } else {
      console.log('No such document!');
    }
  }
  const fetchPost = async () => {

    const docSnap = await getDocs(query(collection(db, 'post'), where("userid", "==", userid)));
    if (docSnap.docs.length > 0) {
      const data = docSnap.docs.map((doc) => ({
        propertyId: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setShowpost(data);
    } else {
      console.log('No such document!');
    }
  }
  const Deletedata = async (id) => {

    await deleteDoc(doc(db, "post", id));
    fetchPost()

  }


  const changeFile = async (event) => {
    const file = await event.target.files[0]
    const metadata = {
      contentType: 'image/jpeg'
    };

    const storageRef = ref(storage, 'User/Photo/' + file.name);

    await uploadBytesResumable(storageRef, file, metadata);
    const url = await getDownloadURL(storageRef).then((downloadURL) => {
      return downloadURL
    });

    const washingtonRef = doc(db, "user", userid);

    await updateDoc(washingtonRef, {
      photo: url
    });
    fetchData()

  }


  useEffect(() => {


    fetchData()
    fetchPost()
  }, [])
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "35rem",
          boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          backgroundColor: "#FBF9F1"
        }}
      >
        <Box sx={{
          marginLeft: "50px",
          display: "flex"
        }}>
          {showuser.map((row, key) => (
            <div key={key} style={{ display: "flex", alignItems: "center" }}>

              <IconButton
                Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                style={{ marginTop: '400px' }} // Adjust the values as needed
              >
                <EditIcon />
                <VisuallyHiddenInput type="file" onChange={changeFile} />
              </IconButton>
              <Avatar
                alt="profile photo"
                sx={{ width: "400px", height: "400px", overflow: "hidden" }}
                src={row.photo}
              />

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "60px",
                  gap: "30px",
                }}
              >
                <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>My Profile</h3>
                <h1 style={{ fontSize: "40px", marginBottom: "25px" }}>{row.name}</h1>
                <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>{row.bio}</h2>
                <h3 style={{ fontSize: "20px" }}>{row.email}</h3>
                <h3 style={{ fontSize: "20px" }}>{row.no}</h3>
              </Box>
            </div>
          ))}
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        marginTop="100px"
      >
        <Grid container spacing={3}>
          {showpost.map((row, key) => (
            <Grid key={key + 1} item xs={12} sm={6} md={4}>
              <Card style={{ marginBottom: '20px', width: '100%', height: '450px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <CardContent>
                  <Avatar
                    src={row.photo}
                    style={{ width: '100%', height: '300px', marginBottom: '20px', borderRadius: '0' }}
                  />
                  <Typography variant="h5" component="div">
                    {row.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div>
                    <IconButton aria-label="delete" onClick={() => Deletedata(row.propertyId)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </div>
                </CardActions>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {row.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {row.timeAgo}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Myprofile;

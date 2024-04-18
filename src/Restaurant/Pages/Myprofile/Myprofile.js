import { CardActions, IconButton, Typography, Avatar, Grid, Card, CardContent, Box } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../../DB/Firebase";
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
  const [showrest, setShowrest] = useState([]);
  const restid = sessionStorage.getItem('rid')


  const fetchData = async (Id) => {
    // const docRef = doc(db, "restaurant", restid);
    // const restDocs = await getDoc(docRef);
    const restDocs = await getDocs(query(collection(db, 'restaurant'), where("id", "==", restid)));
    const placeDocs = await getDocs(query(collection(db, 'place')));

    if (restDocs.docs.length > 0 && placeDocs.docs.length > 0) {
      const placeData = placeDocs.docs.map((doc) => ({
        placeId: doc.id,
        ...doc.data(),
      }));

      const restData = restDocs.docs.map((doc) => ({
        restId: doc.id,
        ...doc.data(),
      }));

      const joinedData = restData.filter((restaurant) => placeData.some((place) => place.placeId === restaurant.place))
        .map((restaurant) => ({
          ...restaurant,
          placeInfo: placeData.find((place) => place.placeId === restaurant.place),
        }));


      console.log(joinedData);
      setShowrest(joinedData);
    } else {
      console.log('No such document!');
    }
  }

  const changeFile = async (event) => {
    const file = await event.target.files[0]
    const metadata = {
      contentType: 'image/jpeg'
    };

    const storageRef = ref(storage, 'Restaurant/Photo/' + file.name);

    await uploadBytesResumable(storageRef, file, metadata);
    const url = await getDownloadURL(storageRef).then((downloadURL) => {
      return downloadURL
    });

    const washingtonRef = doc(db, "restaurant", restid);

    await updateDoc(washingtonRef, {
      photo: url
    });
    fetchData()

  }


  useEffect(() => {


    fetchData()
  }, [])
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "35rem",
        boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
        // backgroundColor: "#FBF9F1"
      }}
    >
      <Box sx={{
        marginLeft: "50px",
        display: "flex"
      }}>
        {showrest.map((row, key) => (
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
              <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>{row.placeInfo.place}</h2>
              <h3 style={{ fontSize: "20px" }}>{row.email}</h3>
            </Box>
          </div>
        ))}
      </Box>
    </Box>

  );
};

export default Myprofile;

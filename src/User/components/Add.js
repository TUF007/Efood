import { Avatar, Button, ButtonGroup, Fab, IconButton, Modal, Stack, styled, TextField, Tooltip, Typography, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Add as AddIcon, DateRange,  } from "@mui/icons-material";
import { Box } from "@mui/system";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../DB/Firebase";
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import FileUploadIcon from '@mui/icons-material/FileUpload';
const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
  
});
const Add = () => {
  const PostCollection = collection(db, 'post');
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState([]);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    console.log(file);
  };
  const InsertData = async () => {
    const userid = sessionStorage.getItem('uid')
    const timestamp = Timestamp.now();
    const dateObject = timestamp.toDate();
    const formattedDate = dateObject.toLocaleString();

    const metadata = {
      contentType: 'image/jpeg'
    };

    const storageRef = ref(storage, 'User/Post/' + photo.name);
    await uploadBytesResumable(storageRef, photo, metadata);
    const url = await getDownloadURL(storageRef).then((downloadURL) => {
      return downloadURL
    });

    const data = {
      title,
      description,
      photo: url,
      userid,
      date: formattedDate
    }
    const response = await addDoc(PostCollection, data)
    console.log(response)
  }
  const fetchUpdatedata = async () => {
    const uid = sessionStorage.getItem('uid')
    const docRef = doc(db, 'user', uid);
    try {
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());

      if (docSnap.exists()) {
        setDetail(docSnap.data());
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  useEffect(() => {
    fetchUpdatedata()
  },[])
  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Create"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={600}
          height={600}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
          
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar
              src={detail.photo}
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500} variant="span">
              {detail.name}
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%", mb: 3 }}
            id="outlined-basic" label="Title" variant="outlined"
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic" label="Content" variant="outlined"
            onChange={(event) => setDescription(event.target.value)}
            multiline
            maxRows={10}
            minRows={10}
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <IconButton color="secondary" component="label" >
              <input type="file" style={{ display: 'none' }} onChange={handlePhotoSelect} />
              <FileUploadIcon/>
            </IconButton>
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={InsertData} >Post</Button>
            <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
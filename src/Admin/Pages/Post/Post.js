import { CardActions, IconButton, Typography, Avatar, Grid, Card, CardContent,Box } from '@mui/material';
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../DB/Firebase";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
;

const Post = () => {

    const [showpost, setShowpost] = useState([]);
 
  const fetchPost = async () => {

    const docSnap = await getDocs(query(collection(db, 'post')));
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
      useEffect(() => {


        
        fetchPost()
      }, [])
  return (
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
  );
};

export default Post;

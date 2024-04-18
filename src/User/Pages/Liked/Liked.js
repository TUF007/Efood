import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../DB/Firebase';

const Liked = () => {

  const [showpost, setShowPost] = useState(null);
  const userid = sessionStorage.getItem('uid')

  const fetchData = async () => {
    try {
        const postDocs = await getDocs(query(collection(db, 'post')));
        const likeDocs = await getDocs(query(collection(db, 'likes'), where("userid", "==", userid)));

        if (postDocs.docs.length > 0 && likeDocs.docs.length > 0) {
            const postData = postDocs.docs.map((doc) => ({
                postId: doc.id,
                ...doc.data(),
            }));

            const likeData = likeDocs.docs.map((doc) => doc.data());

            const joinedData = postData
                .filter((post) => likeData.some((like) => like.postId === post.postId))
                .map((post) => ({
                    ...post,
                    likes: likeData.filter((like) => like.postId === post.postId),
                }));

            setShowPost(joinedData);
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  
  

  useEffect(() => {
    fetchData();
  }, []); // Add empty dependency array

  return (
    <Box
      display="flex"
      justifyContent="center"
      marginTop="100px"
    >
      <Grid container spacing={3}>
        {showpost && showpost.map((row, key) => (
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
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {row.name}
                </Typography>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                  {row.timeAgo}
                </Typography> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Liked;

import { Box, Stack, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import Post from "./Post"
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../DB/Firebase';
const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [showpost, setShowPost] = useState([]);
  setTimeout(() => {
    setLoading(false);
  }, [3000]);
  const fetchData = async () => {
    const postDocs = await getDocs(query(collection(db, 'post')));
    const userDocs = await getDocs(query(collection(db, 'user')));
  
    if (userDocs.docs.length > 0 && postDocs.docs.length > 0) {
      const userData = userDocs.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
      }));
  
      const postData = postDocs.docs.map((doc) => ({
        postId: doc.id,
        ...doc.data(),
        postDate: doc.data().timestamp, // Replace 'timestamp' with the actual timestamp field in your post data
      }));
  
      const joinedData = postData
        .filter((post) => userData.some((user) => post.userid === user.userId))
        .map((post) => ({
          ...post,
          userInfo: userData.find((user) => post.userid === user.userId),
          timeAgo: getTimeDifference(post.date),
        }));
  
      console.log(joinedData);
      setShowPost(joinedData);
    } else {
      console.log('No such document!');
    }
  }
  
  function getTimeDifference(postDate) {
    const currentDate = new Date();
    const postTime = new Date(postDate);
  
    const timeDifferenceInSeconds = Math.floor((currentDate - postTime) / 1000);
  
    if (timeDifferenceInSeconds < 60) {
      return timeDifferenceInSeconds === 1 ? '1 second ago' : `${timeDifferenceInSeconds} seconds ago`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (timeDifferenceInSeconds < 604800) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (timeDifferenceInSeconds < 2419200) { // One week is 7 days (7 * 24 * 3600 seconds)
      const weeks = Math.floor(timeDifferenceInSeconds / 604800);
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else if (timeDifferenceInSeconds < 29030400) { // One month is approximately 30 days (30 * 24 * 3600 seconds)
      const months = Math.floor(timeDifferenceInSeconds / 2419200);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return postTime.toLocaleDateString(undefined, options);
    }
}

  
  
  useEffect(() => {


    fetchData()
  }, [])
  return (
    <Box>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          {showpost.map((props, key) => (
            <Post props={props} key={key} />
          ))}
        </>
      )}
    </Box>
  );
};

export default Feed
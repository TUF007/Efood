import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { db } from '../../DB/Firebase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    marginRight: "495px"
});
const Comment = () => {
    const CommentCollection = collection(db, 'comment');
    const userid = sessionStorage.getItem('uid')
    const [comment, setComment] = useState('');
    const [showdetail, setShowDetail] = useState([]);

    const InsertData = async () => {

        const data = {
            comment,
            userid
        }
        const response = await addDoc(CommentCollection, data)
        console.log(response)
    }
    const fetchcomment = async () => {
        const docSnap = await getDocs(query(collection(db, 'comment')));
        const docSnap1 = await getDocs(query(collection(db, 'user')));

        if (docSnap.docs.length > 0 && docSnap1.docs.length > 0) {
            const userData = docSnap1.docs.map((doc) => ({
                userId: doc.id,
                ...doc.data(),
            }));
            const commentData = docSnap.docs.map((doc) => ({
                commentId: doc.id,
                ...doc.data(),
            }));
            console.log(docSnap.docs[0].data());

            const joinedData = commentData
                .filter((comment) => userData.some((user) => comment.userid === user.userId))
                .map((comment) => ({
                    ...comment,
                    userInfo: userData.find((user) => comment.userid === user.userId),
                }));

            console.log(joinedData);
            setShowDetail(joinedData);
        } else {
            console.log('No such document!');
        }
    };

    useEffect(() => {

        fetchcomment()
    }, [])
    return (
        <Box
    width={600}
    height={600}
    bgcolor="white"
    color="text.primary"
    p={3}
    borderRadius={5}
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    mx="auto"
    my="auto"
    boxShadow={5}
    overflowY="scroll"  // Enable vertical scroll
    overflowX="hidden"  // Hide horizontal scroll
>


            <Typography variant="h6" color="text.secondary" mb={5}>
                Comments
            </Typography>
            {showdetail.map((row, key) => (
                <>
                    <UserBox>
                        <Avatar
                            src={row.photo}
                            sx={{ width: 30, height: 30 }}
                        />
                        <Typography fontWeight={500} variant="span">

                        </Typography>
                    </UserBox>
                    <Typography
                        key={key}
                        sx={{ width: '100%', mb: 3, maxHeight: '300px' }}
                        variant="outlined"
                        multiline
                        maxRows={13}
                        minRows={13}
                    >
                        {row.comment}
                    </Typography>
                </>
            ))}

            <Box display="flex" alignItems="center" width="100%" mt="300px">
                <TextField
                    sx={{ width: 'calc(95% - 8px)', mb: 3, mr: 2 }}
                    id="outlined-basic"
                    label="Content"
                    variant="outlined"
                    multiline
                    onChange={(event) => setComment(event.target.value)}
                />
                <Button
                    sx={{ width: '70px', height: '40px', mb: 3 }}
                    variant="contained"
                    color="primary"
                    onClick={() => InsertData()}
                >
                    Add
                </Button>
            </Box>
        </Box>
    );
};

export default Comment;

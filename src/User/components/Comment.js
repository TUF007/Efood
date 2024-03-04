import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { db } from '../../DB/Firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';

const Comment = ({ postId }) => {
    console.log(postId);

    const CommentCollection = collection(db, 'comment');
    const userid = sessionStorage.getItem('uid')
    const [comment, setComment] = useState('');
    const [showdetail, setShowDetail] = useState([]);

    const InsertData = async () => {

        const data = {
            comment,
            userid,
            postId,
        }
        const response = await addDoc(CommentCollection, data)
        fetchcomment()

        console.log(response)
    }
    const fetchcomment = async () => {
        const docSnap = await getDocs(query(collection(db, 'comment'), where('postId', '==', postId)));
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
            setShowDetail([]);

            console.log('No such document!');
        }
    };
    const Deletedata = async (id) => {

        await deleteDoc(doc(db, "comment", id));
        fetchcomment()

    }
    useEffect(() => {

        fetchcomment()
    },[])
    return (
        <Box
            width={800}
            height={650}
            bgcolor="white"
            color="text.primary"
            p={3}
            mx="auto"
            my="auto"
        >
            <Typography variant="h6" color="text.secondary" style={{ textAlign: 'center' }}>
                Comments
            </Typography>

            <Box
                sx={{
                    overflowY: 'scroll', height: 500,px:6
                }}>

                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                >

                </Box>
                {showdetail.map((row, key) => (
                    <>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <Avatar src={row.userInfo.photo} sx={{ width: 30, height: 30 }} />
                            <Typography fontWeight={500} variant="span" marginLeft={1}>
                                {row.userInfo.name}
                            </Typography>
                        </Box>

                        <Box marginTop={1} marginLeft={5} sx={{display:'flex',justifyContent:'space-around'}}>
                            <Typography
                                key={key}
                                sx={{ width: '100%', maxHeight: '300px' }}
                                variant="outlined"
                                multiline
                                maxRows={5}
                                minRows={5}
                            >
                                {row.comment}
                            </Typography>
                            {
                                row.userid === userid ? <IconButton aria-label="delete" onClick={() => Deletedata(row.commentId)}>
                                    <DeleteIcon />
                                </IconButton> : ''
                            }

                        </Box>
                    </>

                ))}

            </Box>


            <Box display="flex" alignItems="flex-end" width="100%" sx={{ mt: 5 }} >
                <TextField
                    sx={{ width: 'calc(95% - 8px)', mr: 2 }}
                    id="outlined-basic"
                    label="Content"
                    variant="outlined"
                    multiline
                    onChange={(event) => setComment(event.target.value)}
                />
                <Button
                    sx={{ width: '70px', height: '55px' }}
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

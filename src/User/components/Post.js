import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Favorite, FavoriteBorder} from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/Comment';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../DB/Firebase';
import Comment from './Comment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



const Post = ({ props }) => {
  const LikesCollection = collection(db, 'likes');
  const [expanded, setExpanded] = useState(false);
  const [isCommentOpen, setCommentOpen] = useState(false);
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [count, setCount] = useState('')
  const [check, setCheck] = useState(false)
  const userid = sessionStorage.getItem('uid');

  const handleButtonClick = () => {
    setShowDeleteOption(!showDeleteOption);
  };

  const handleCommentClick = () => {
    setCommentOpen(!isCommentOpen);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchLike = async () => {
    const q = query(LikesCollection, where("postId", "==", props.postId));
    const querySnapshot = await getDocs(q);
    const numberOfLikes = querySnapshot.size;
    setCount(numberOfLikes)
    const likeDoc = await getDocs(
      query(LikesCollection,
        where("postId", "==",  props.postId),
        where("userid", "==", userid)
      )
    );
    if (likeDoc.docs.length > 0) {
      setCheck(true)
    }
    else{
      setCheck(false)
    }

  }


  const InsertData = async (postId) => {

    // const likeDoc = await getDoc(doc(LikesCollection, {postId}));

    const likeDoc = await getDocs(
      query(LikesCollection,
        where("postId", "==", postId),
        where("userid", "==", userid)
      )
    );

    if (likeDoc.docs.length > 0) {


      const q = query(LikesCollection, where("postId", "==", postId), where("userid", "==", userid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docdata) => {
        await deleteDoc(doc(LikesCollection, docdata.id));
      });
      fetchLike()
      console.log('Like deleted');
    } else {

      const data = {
        userid,
        postId,
      };
      const response = await addDoc(LikesCollection, data);
      fetchLike()
      console.log('Like added', response);
    }
  };
  const Deletedata = async (id) => {

    await deleteDoc(doc(db, "post", id));

  }


  useEffect(() => {
    fetchLike()
  }, [])
  return (

    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar src={props.userInfo.photo} />
        }
        action={
          <div>
            {
              userid === props.userInfo.id &&  <IconButton aria-label="settings" onClick={handleButtonClick}>
              <ArrowBackIosNewIcon />
            </IconButton>
            }
           

            {showDeleteOption && (
              <IconButton aria-label="delete" onClick={() => Deletedata(props.postId)}>
                <DeleteOutlineIcon />
              </IconButton>
            )}
          </div>
        }
        title={props.userInfo.name}

        subheader={props.timeAgo}
      />
     

      <CardMedia
        component="img"
        height="20%"
        image={props.photo}
        alt={props.photo}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '20px' }} >
          {props.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      
        <IconButton aria-label="add to favorites" onClick={() => InsertData(props.postId)}
        >
          {
            check ? <Favorite sx={{ color: "red" }} /> :
              <FavoriteBorder />

          }

        </IconButton>
        <Typography>{count}</Typography>
        <IconButton aria-label="comment" onClick={handleCommentClick}>
          <CommentIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{props.description}</Typography>
        </CardContent>
      </Collapse>
      {isCommentOpen && (
        <div>
          {<Comment postId={props.postId} />}
        </div>
      )}
    </Card>
  );
}
export default Post;
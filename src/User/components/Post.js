import React, { useState } from 'react';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder, Share } from '@mui/icons-material';
import CommentIcon from '@mui/icons-material/Comment';
import { addDoc, collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../DB/Firebase';



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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const InsertData = async (postId) => {
    const userid = sessionStorage.getItem('uid');
  
    const likeDoc = await getDoc(doc(LikesCollection, postId));
  
    if (likeDoc.exists()) {
      
      await deleteDoc(doc(LikesCollection, postId));
      console.log('Like deleted');
    } else {
      
      const data = {
        userid,
        postId,
      };
      const response = await addDoc(LikesCollection, data);
      console.log('Like added', response);
    }
  };
return (
  <Card sx={{ margin: 5 }}>
    <CardHeader
      avatar={
        <Avatar src={props.userInfo.photo} />
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
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
      <IconButton aria-label="add to favorites">
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
          onClick={() => InsertData(props.postId)}
        />
      </IconButton>
      <IconButton aria-label="comment">
        <CommentIcon />
      </IconButton>
      <IconButton aria-label="share">
        <Share />
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
  </Card>
);
}
export default Post;
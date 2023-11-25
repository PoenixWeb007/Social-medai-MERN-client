import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { stringAvatar } from "../../utilities/stringAvatar";
import {
  Box,
  Button,
  Checkbox,
  Link,
  Modal,
  TextField,
  useTheme,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useAddComment, useFetchLike, useWhoLikes } from "../../hooks/usePosts";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { AddCommentSchema } from "../../schemas/addCommentSchema";
import { useState } from "react";
import { useEffect } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post({ fullName, createdAt, description, postId, likes, comments }) {
  const [comment, setComment] = useState("");
  const { _id } = useSelector((state) => state.global.user);
  const { neutral } = useTheme().palette;
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);
  const date = new Date(createdAt).toDateString();
  const likesNum = Object.keys(likes).length;

  const users = useWhoLikes(likes);
  useEffect(() => {
    //getWhoLikes();
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const fetchLike = useFetchLike(postId, _id, likes);
  const handleLike = () => {
    fetchLike();
  };
  useEffect(() => {
    if (comment !== "") {
      addComment();
      setComment("");
    }
  }, [comment]);
  const addComment = useAddComment(postId, _id, comment);
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: AddCommentSchema,
    onSubmit: (values) => {
      setComment(values.comment);
      formik.resetForm();
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Card sx={{ minWidth: 345, margin: "10px" }}>
      <CardHeader
        avatar={
          <Avatar
            {...stringAvatar(`${fullName.toUpperCase()}`)}
            sx={{
              bgcolor: `primary.dark`,
              color: `neutral.light`,
              "& p": { fontSize: "24px", margin: 0 },
            }}
            aria-label="recipe"
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={fullName}
        subheader={date}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ height: "auto" }}
        component="img"
        height="194"
        image="/assets/post_placeholder.png"
        alt="Paella dish"
      />
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          //justifyContent: "start",
        }}
      >
        <Link sx={{ color: `primary.dark`, textDecoration: "none" }}>
          <span
            onClick={handleOpen}
            style={{ fontSize: "14px", padding: "4px" }}
          >
            {users.length === 0
              ? ""
              : users.length === 1
              ? `${users[0]?.firstName} liked this`
              : `${users[0]?.firstName} and ${likesNum - 1} others liked this`}
          </span>
        </Link>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid background.alt",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Liked by
            </Typography>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            {users.map((user, index) => {
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar
                      {...stringAvatar(
                        `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`
                      )}
                      sx={{
                        bgcolor: `primary.dark`,
                        color: `neutral.light`,
                        width: 28,
                        height: 28,
                        "& p": { fontSize: "18px", margin: 0 },
                      }}
                      aria-label="profile"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}
                    //secondary={comment.comment}
                  />
                </ListItem>
              );
            })}
          </Box>
        </Modal>

        <Box>
          <Checkbox
            checked={likes[_id] ? true : false}
            onChange={handleLike}
            color={`secondary`}
            aria-label="Checkbox demo"
            icon={
              <>
                <span style={{ fontSize: "16px", padding: "4px" }}>
                  {likesNum}
                </span>
                <ThumbUpOffAltIcon />
              </>
            }
            checkedIcon={
              <>
                <span style={{ fontSize: "16px", padding: "4px" }}>
                  {likesNum}
                </span>
                <ThumbUpAltIcon />
              </>
            }
          />
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show comments"
            style={{
              marginLeft: "0",
              "& button ": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <span style={{ fontSize: "16px", padding: "4px" }}>
              {Object.keys(comments).length}
            </span>
            <ChatBubbleOutlineIcon />
          </ExpandMore>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ width: "100%" }}>
          <List
            sx={{
              width: "100%",
              //maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {comments.map((comment, index) => {
              const fullName = `${comment.firstName} ${comment.lastName}`;
              return (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar
                      {...stringAvatar(
                        `${comment.firstName.toUpperCase()} ${comment.lastName.toUpperCase()}`
                      )}
                      sx={{
                        bgcolor: `primary.dark`,
                        color: `neutral.light`,
                        width: 28,
                        height: 28,
                        "& p": { fontSize: "18px", margin: 0 },
                      }}
                      aria-label="profile"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={fullName}
                    secondary={comment.comment}
                  />
                </ListItem>
              );
            })}
            <ListItem>
              {/* <Box
                sx={{ width: "auto", display: "flex", alignItems: "flex-end" }}
              > */}
              {/* <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
              <form
                onSubmit={formik.handleSubmit}
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-static"
                  name="comment"
                  label="Add comment"
                  multiline
                  rows={3}
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <IconButton
                  aria-label="send"
                  type="submit"
                  disabled={!formik.dirty}
                >
                  <SendIcon />
                </IconButton>
              </form>
              {/* </Box> */}
            </ListItem>
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;

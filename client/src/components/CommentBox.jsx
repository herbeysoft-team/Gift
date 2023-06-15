import { IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { addComment, getComments, getCommentsForPost } from "../context/features/commentSlice";
import {useDispatch } from "react-redux";
import toast from "react-hot-toast";



const CommentBox = ({postId}) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");


  //function called when any input value is changed
  const onInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if(commentText && postId){
      dispatch(addComment({formData:{
          postId,
          commentText
        }, toast}))
    }
    setCommentText("")
    dispatch(getCommentsForPost(postId))
    dispatch(getComments(postId))
  };
  return (
    <Paper
      component="form"
      sx={{
        position: "stikcy",
        px: 1,
        py: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: 20,
        marginBottom: 7,
        flexGrow: 1,
        bottom: 20,
        right: 0,
        left: 0,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, width: "100%" }}
        placeholder="Write a comment"
        name="commentText"
        type="text"
        id="commentText"
        onChange={onInputChange}
        value={commentText|| ""}
      />
      <IconButton type="submit" sx={{ p: "10px" }} onClick={handlePostComment}>
        <SendIcon color="primary" />
      </IconButton>
    </Paper>
  );
};

export default CommentBox;

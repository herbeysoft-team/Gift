import { IconButton, InputBase, Paper } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";

const CommentBox = () => {
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
      />
      <IconButton type="submit" sx={{ p: "10px" }}>
        <SendIcon color="primary" />
      </IconButton>
    </Paper>
  );
};

export default CommentBox;

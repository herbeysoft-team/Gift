import { Box, Fab, Typography } from '@mui/material'
import React from 'react'
import Post from './Post'
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";
import Gift from "../assets/gift.png";

const Feeds = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state.auth }));


  return (
    <Box>
        {/* The Gift Box Button */}
      <Box
        p={2}
        sx={{
          elevation: 2,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
          gap: 1,
        }}
      >
        <Fab color={"primary"} size="large" aria-label="add" onClick={()=> navigate("/home/trow")}>
          <img src={Gift} alt="logo" width={24} height={24} />
        </Fab>
        <Typography variant="body">Share the love!</Typography>
      </Box>

      {/* The Post Here */}
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />

    </Box>
  )
}

export default Feeds

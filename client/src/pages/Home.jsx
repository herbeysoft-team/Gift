import React, {useEffect} from "react";
import { Box, Fab, Typography} from "@mui/material";
import Post from "../components/Post";
import Gift from "../assets/gift.png";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(()=>{
    console.log(user?.result?.id)
  },[user]);

  return (
    <Box flex={3}>
      <MobileNavBar logo={Logo} title={"Home"}/>
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
  );
};

export default Home;

import React from "react";
import { Box, Fab, Typography} from "@mui/material";
import Post from "../components/Post";
import Gift from "../assets/gift.png";
import MobileNavBar from "../components/MobileNavBar";
import ButtomNav from "../components/ButtomNav";


const Home = () => {
  return (
    <Box flex={3}>
      <MobileNavBar/>
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
        <Fab color={"primary"} size="large" aria-label="add">
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
      <ButtomNav />
    </Box>
  );
};

export default Home;

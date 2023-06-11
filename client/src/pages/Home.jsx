import React from "react";
import { Box } from "@mui/material";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import HomeNavTabs from "../components/HomeNavTabs";

const Home = () => {
  return (
    <Box flex={3}>
      <MobileNavBar logo={Logo} title={"Home"} />

      {/* Other Sections start here */}

      <HomeNavTabs />
    </Box>
  );
};

export default Home;

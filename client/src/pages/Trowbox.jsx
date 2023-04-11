import { Box } from "@mui/material";
import React from "react";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import Header from "../components/Header";
import TrowboxNavTabs from "../components/TrowboxNavTabs";

const Trowbox = () => {
  return (
    <Box flex={3}>
      <MobileNavBar logo={Logo} title={"Trowbox"} />
      {/* Header section  */}
      <Header />

      {/* Other Sections start here */}

      <TrowboxNavTabs />
    </Box>
  );
};

export default Trowbox;

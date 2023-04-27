import { Box } from "@mui/material";
import React from "react";
import MobileNavBar from "../components/MobileNavBar";
import Notify from "../assets/Notify.png";
import NotifyHeader from "../assets/NotifyHeader.png";
import Header from "../components/Header";
import NotifyCard from "../components/NotifyCard";

const Notification = () => {
  return (
    <Box flex={3}>
      <MobileNavBar logo={Notify} title={"Notification"} />

      {/* Header section  */}
      <Header logo={NotifyHeader} title={"My Notifications"} />

      {/* Other Sections start here */}
      <Box
        sx={{
          width: "100%",
          px: 1,
          py: 0.5,
        }}
      >
        <NotifyCard />
        <NotifyCard />
        <NotifyCard />
        <NotifyCard />
        <NotifyCard />
        <NotifyCard />
        <NotifyCard />
      </Box>
    </Box>
  );
};

export default Notification;

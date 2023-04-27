import { Box, Typography } from "@mui/material";
import React from "react";
import NotifyIn from "../assets/NotifyIn.png";
import NotifySentIcon from "../assets/NotifySentIcon.png";

const NotifyCard = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        elevation: 2,
        boxShadow: 1,
        px: 2,
        py: 1,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <img src={NotifyIn} alt="logo" width={32} height={32} />
        <Typography
          variant="caption"
          sx={{ fontFamily: "Poppins", color: "primary" }}
        >
          You have trowboxed a Car to @herbeysoft
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <img src={NotifySentIcon} alt="logo" width={24} height={24} />
      </Box>
    </Box>
  );
};

export default NotifyCard;

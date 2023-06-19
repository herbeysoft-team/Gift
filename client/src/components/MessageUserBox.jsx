import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import URLBASE from "../constant/urlbase";
import { deepPurple } from "@mui/material/colors";

const MessageUserBox = ({ user }) => {
  const navigate = useNavigate();

  const handleGoToLink = (id) => {
    navigate(`/home/messagedetails/${id}`);
  };
  return (
    <Box
      onClick={() => handleGoToLink(user?.user_id)}
      display="flex"
      flexDirection="row"
      alignItems="center"
      sx={{
        elevation: 1,
        boxShadow: 1,
        px: 2,
        py: 1,
        borderRadius: 2,
        my: 1,
        gap: 2,
      }}
    >
      <Avatar
        alt="PP"
        src={`${URLBASE.imageBaseUrl}${user?.profilePic}`}
        sx={{ bgcolor: deepPurple[500], width: 64, height: 64 }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyItems: "flex-start",
        }}
      >
        <Typography
          variant="body"
          sx={{ fontFamily: "Poppins", color: "primary" }}
        >
          {user?.fullname}
        </Typography>

        <Typography
          variant="caption"
          sx={{ fontFamily: "Poppins", color: "secondary", fontSize: "0.5rem" }}
        >
          {`@${user?.username}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageUserBox;

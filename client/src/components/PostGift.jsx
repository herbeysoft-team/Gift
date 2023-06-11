import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import URLBASE from "../constant/urlbase";
import { useNavigate } from "react-router-dom";

const PostGift = ({ box }) => {
  const navigate = useNavigate()

  const handleGoProfile = (id) => {
    if(id){
      navigate(`/home/profile/${id}`)
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        px: 2,
        py: 1,
        boxShadow:1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          flex: 5,
        }}
      >
        <Avatar
          variant="square"
          alt="GT"
          src={`${URLBASE.imageBaseUrl}${box?.item_pics}`}
          sx={{ width: "62", height: "62" }}
        />
        <Typography variant="body">{box?.item_name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          float:"right",
        }}
      >
        <Avatar
          variant="circle"
          alt="GT"
          src={`${URLBASE.imageBaseUrl}${box?.profilePic}`}
          sx={{ width: "62", height: "62" }}
          onClick={()=> handleGoProfile(box?.userId)}
        />
      </Box>
    </Box>
  );
};

export default PostGift;

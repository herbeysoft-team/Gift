import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { deepPurple } from "@mui/material/colors";
import URLBASE from "../constant/urlbase";
import moment from "moment"

const PostComment = ({box}) => {

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      gap={1}
      mb={1}
    >
      <Avatar alt="PP" src={`${URLBASE.imageBaseUrl}${box?.profilePic}`} sx={{ bgcolor: deepPurple[500] }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          boxShadow: 1,
          borderRadius: 10,
          flex: 5
        }}
      >
        <Box
          gap={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Box>
            <Typography
              variant="body"
              color="secondary"
              sx={{ fontFamily: "Poppins"}}
            >
             {box?.fullname}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="secondary">
              {moment(box?.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" color="primary" alignSelf="self-start">
          {box?.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default PostComment;

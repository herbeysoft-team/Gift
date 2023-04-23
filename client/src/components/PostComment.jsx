import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { deepPurple } from "@mui/material/colors";

const PostComment = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      gap={1}
      mb={1}
    >
      <Avatar alt="PP" src="" sx={{ bgcolor: deepPurple[500] }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          boxShadow: 1,
          borderRadius: 10,
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
              color="primary"
              sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
            >
              Rukayyat Saad
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="secondary">
              5d
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" color="primary">
          This is so great, I love it and it is so great and interesting. Btw, Kudos to you 
        </Typography>
      </Box>
    </Box>
  );
};

export default PostComment;

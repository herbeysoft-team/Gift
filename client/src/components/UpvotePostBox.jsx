import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';

const UpvotePostBox = ({post}) => {
    const navigate = useNavigate();

  const handleGoToPost = (id) => {
    navigate(`/home/postdetails/${id}`);
  };
  return (
    <Box
      onClick={() => handleGoToPost(post?.id)}
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
      <FavoriteIcon color="secondary"/>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyItems: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{ fontFamily: "Poppins", fontSize:"0.8rem"}}
        >
          {`@${post?.username} upvoted this post`}
        </Typography>

        <Typography
          variant="caption"
          sx={{ fontFamily: "Poppins", color: "secondary", fontSize: "0.9rem" }}
        >
          {post?.description}
        </Typography>
      </Box>
    </Box>
  )
}

export default UpvotePostBox

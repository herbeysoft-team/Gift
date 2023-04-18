import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const PostGift = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'flex-start',
        gap: 1,
        px: 2,
        py: 1,
      }}
    >
      <Avatar
        variant="square"
        alt="GT"
        src="https://cdn.shopify.com/s/files/1/0011/0162/7439/products/iPhone14ProMax_DeepPurple_0c05c6a6-f4f9-4945-a45c-41b4b70edcac_5000x.png?v=1668772224"
        sx={{width:"62", height:"62" }}
      />
      <Typography variant="body">IPhone 14</Typography>
    </Box>
  );
};

export default PostGift;

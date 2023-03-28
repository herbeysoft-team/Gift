import React from "react";
import { Box } from "@mui/material";
const Rightbar = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <h1>RightBar</h1>
      </Box>

    </Box>
  );
};

export default Rightbar;

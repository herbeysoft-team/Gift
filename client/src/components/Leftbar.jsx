import React from "react";
import { Box } from "@mui/material";

const Leftbar = () => {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box position="fixed" >
            <h1>LeftBar</h1>

        </Box>
    </Box>
  );
};

export default Leftbar;

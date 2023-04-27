import { Box, Fab, Typography } from "@mui/material";
import React from "react";


const Hero = ({logo, title}) => {
  return (
    <Box
      p={3}
      sx={{
        elevation: 2,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        boxShadow: 1,
        gap: 1,
        mx: 1,
        backgroundColor: "#642c8e",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        WebkitBorderBottomLeftRadius: 20,
        WebkitBorderBottomRightRadius: 20,
      }}
    >
        <Fab color={"primary"} size="large" aria-label="add" elevation={2} >
            <img src={logo} alt="logo" width={24} height={24} />
        </Fab>
      

      <Typography
        variant="h6"
        color={"white"}
        sx={{ fontFamily: "Poppins", fontWeight: "medium" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Hero;

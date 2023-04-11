import { Box, Grid } from "@mui/material";
import React from "react";
import TrowCard from "./TrowCard";

const TrowCards = () => {
  return (
    <Box
      sx={{
        mt: 3,
        mb: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <TrowCard />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <TrowCard />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <TrowCard />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <TrowCard />
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default TrowCards;

import { Box, Button, CardMedia, Divider, Typography } from "@mui/material";
import React from "react";
import Hero from "./Hero";
import Gift from "../../assets/gift.png";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const EventReview = () => {
  return (
    <Box
      sx={{ mx: 0.5, mb: 2, justifyContent: "center", alignItems: "center" }}
    >
      {/* header or hero section */}
      <Hero logo={Gift} title={"Trow Review"} />
      {/* the form  */}

      {/* The trow review */}
      <Box
        sx={{
          position: "relative",
          my: 4,
          mx: 2,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          height="10%"
          fit="cover"
          image="https://th.bing.com/th/id/OIP.iPkt7kskdztbDzNLHx3BOgHaEi?pid=ImgDet&w=1200&h=736&rs=1"
          alt="Paella dish"
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            display: "flex",
            flexDirection: "row",
            gap: 1,
            backgroundColor: "white",
            opacity: 0.6,
            px: 1,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", flex: 3 }}>
            <Typography
              variant="h5"
              color="primary"
              fontFamily="Poppins"
              fontWeight="medium"
            >
              Product Lunch
            </Typography>
            <Divider />
            <Typography variant="body" color="primary" fontFamily="Poppins">
              The Trowbox app is lunching its demo to the public
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Trow Button */}
      <Box display="flex" alignContent="center" justifyContent="center">
      <Button variant="contained" endIcon={<ArrowRightAltIcon />}>
        Trow It !!!
    </Button>
    </Box>
    </Box>
  );
};

export default EventReview;

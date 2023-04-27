import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import Gift from "../../assets/gift.png";
import Hero from "./Hero";

const Recipient = () => {
  return (
    <Box
      sx={{ mx: 0.5, mb: 2, justifyContent: "center", alignItems: "center" }}
    >
      {/* header or hero section */}
      <Hero logo={Gift} title={"Add Gift/Event"} />

      {/* the form  */}
      <Box
        component="form"
        noValidate
        sx={{
          my: 1,
          marginX: { xs: "0.5rem", md: "0.5rem", lg: "3rem" },
          p: 3,
        }}
      >
        <Typography
          variant="body"
          color={"primary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          Recipient
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          size="normal"
          id="username"
          label="Enter Username"
          name="username"
          // onChange={onInputChange}
        />
        <Typography
          variant="body"
          color={"primary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          Not on the app?
        </Typography>
        <TextField
          margin="normal"
          size="normal"
          fullWidth
          name="phone_no"
          label="Enter Phone Number of Recipient"
          type="text"
          id="phone_no"
        />
      </Box>
    </Box>
  );
};

export default Recipient;

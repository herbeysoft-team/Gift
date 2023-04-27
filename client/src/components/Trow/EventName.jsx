import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import Gift from "../../assets/gift.png";
import Hero from "./Hero";
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';

const EventName = () => {
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
          Event Name
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          size="normal"
          id="event_name"
          label="Enter Gift/Event Name"
          name="event_name"
          // onChange={onInputChange}
        />
        <Typography
          variant="body"
          color={"primary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          Category
        </Typography>
        <TextField
            InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <FormatAlignCenterIcon color="primary"/>
              </InputAdornment>
            ),
          }}
          margin="normal"
          size="normal"
          fullWidth
          name="category_name"
          label="Select Category"
          type="text"
          id="category_name"
        />
      </Box>
    </Box>
  );
};

export default EventName;

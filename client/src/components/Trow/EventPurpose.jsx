import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Gift from "../../assets/gift.png";
import Hero from "./Hero";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const EventPurpose = () => {
  const [value, setValue] = useState(null);
  console.log(value);
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
          Event Purpose
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          size="normal"
          id="event_purpose"
          label="Reason for the Event/Gift"
          name="event_purpose"
          // onChange={onInputChange}
        />
        <Typography
          variant="body"
          color={"primary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          Schedule
        </Typography>
        <Box sx={{ width: "100%" }}>
          {/* <DatePicker label="Responsive variant" defaultValue={dayjs('2022-04-17')} /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              minDate={dayjs("2023-04-01")}
              value={value}
              onChange={(newValue) => {
                setValue(newValue.format("DD/MM/YYYY"));
              }}
              sx={{ width: "100%", mt: 2 }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default EventPurpose;

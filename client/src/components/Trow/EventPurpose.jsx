import { Box, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Gift from "../../assets/gift.png";
import Hero from "./Hero";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const EventPurpose = () => {
  const [event_purpose, setEvent_purpose] = useState(null);
  const [event_date, setEvent_date] = useState(null);

  useEffect(() => {
    // Check if trowDetails already exists in local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      const trowDetails = JSON.parse(trowDetailsString);
      setEvent_purpose(trowDetails.event_purpose);
      setEvent_date(trowDetails.event_date);
    }
  }, []);

  const handleEventPurposeChange = (event) => {
    setEvent_purpose(event.target.value);
    // Retrieve "trowDetails" from local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      // Parse the retrieved string into an object
      const trowDetails = JSON.parse(trowDetailsString);
      // Update the username value
      trowDetails.event_purpose= event.target.value;
      // Convert the updated object back to a string
      const updatedTrowDetailsString = JSON.stringify(trowDetails);
      // Set the updated string back into local storage
      localStorage.setItem("trowDetails", updatedTrowDetailsString);
    }
  };

  const handleEventDateChange = (newValue) => {
    setEvent_date(newValue.format("YYYY-MM-DD"));
    // Retrieve "trowDetails" from local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      // Parse the retrieved string into an object
      const trowDetails = JSON.parse(trowDetailsString);
      // Update the username value
      trowDetails.event_date= newValue.format("YYYY-MM-DD");
      // Convert the updated object back to a string
      const updatedTrowDetailsString = JSON.stringify(trowDetails);
      // Set the updated string back into local storage
      localStorage.setItem("trowDetails", updatedTrowDetailsString);
    }
  };

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
          value={event_purpose || ""}
          onChange={handleEventPurposeChange}
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
              value={event_date ? dayjs(event_date) : null}
              onChange={handleEventDateChange}
              sx={{ width: "100%", mt: 2 }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default EventPurpose;

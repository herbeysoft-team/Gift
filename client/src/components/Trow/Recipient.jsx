import { Box, TextField, Typography, Autocomplete } from "@mui/material";
import React, { useState, useEffect } from "react";
import Gift from "../../assets/gift.png";
import Hero from "./Hero";
import { useDispatch, useSelector } from "react-redux";
import { getUsersToGift } from "../../context/features/userSlice";

const Recipient = () => {
  const dispatch = useDispatch();
  const { usersToGift } = useSelector((state) => ({ ...state.user }));
  const [username, setUsername] = useState(null);
  const [phone_no, setPhone_no] = useState(null);

  useEffect(() => {
    dispatch(getUsersToGift());
  }, [dispatch]);

  useEffect(() => {
    // Check if trowDetails already exists in local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      const trowDetails = JSON.parse(trowDetailsString);
      setUsername(trowDetails.username);
      setPhone_no(trowDetails.phone_no);
    } else {
      // Set default values and create userDetails in local storage
      setUsername("");
      setPhone_no("");

      const defaultTrowDetails = {
        username: "",
        phone_no: "",
        event_name:"",
        category_name:"",
        event_purpose:"",
        event_date:"",
        recommended_gift:[],
        event_picture:"",
      };

      localStorage.setItem("trowDetails", JSON.stringify(defaultTrowDetails));
    }
  }, []);


  const handleUsernameChange = (event, newValue) => {
    setUsername(newValue);
    // Retrieve "trowDetails" from local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      // Parse the retrieved string into an object
      const trowDetails = JSON.parse(trowDetailsString);
      // Update the username value
      trowDetails.username = newValue;

      // Convert the updated object back to a string
      const updatedTrowDetailsString = JSON.stringify(trowDetails);
      // Set the updated string back into local storage
      localStorage.setItem("trowDetails", updatedTrowDetailsString);
    }
  };

  const handlePhoneNoChange = (event) => {
    setPhone_no(event.target.value);
    // Retrieve "trowDetails" from local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      // Parse the retrieved string into an object
      const trowDetails = JSON.parse(trowDetailsString);
      // Update the username value
      trowDetails.phone_no = event.target.value;
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
          Recipient
        </Typography>
        <Autocomplete
          onChange={handleUsernameChange}
          options={usersToGift}
          getOptionLabel={(usersToGift) =>
            `${usersToGift?.fullname} - ${usersToGift?.username}`
          }
          value={username}
          // eslint-disable-next-line eqeqeq
          isOptionEqualToValue={(option, value) =>
            option.username === value.username ||
            option.fullname === value.fullname
          }
          noOptionsText={"No Result Found.."}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter Username or Fullname"
              variant="outlined"
              margin="normal"
              fullWidth
              size="normal"
              id="username"
              name="username"
              value={username}
            />
          )}
        />
        <Typography
          variant="body"
          color={"primary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          Not on the app?
        </Typography>
        <TextField
          value={phone_no || ""}
          margin="normal"
          size="normal"
          fullWidth
          name="phone_no"
          label="Enter Phone Number of Recipient"
          type="text"
          id="phone_no"
          onChange={handlePhoneNoChange}
        />
      </Box>
    </Box>
  );
};

export default Recipient;

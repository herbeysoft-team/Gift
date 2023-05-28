import { Box, InputAdornment, MenuItem, TextField, Typography} from "@mui/material";
import React, { useState, useEffect } from "react";
import Gift from "../../assets/gift.png";
import Hero from "./Hero";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { getSubcategories} from "../../context/features/itemSlice";
import { useSelector, useDispatch } from "react-redux";

const EventName = () => {
  const dispatch = useDispatch()
  const [event_name, setEvent_name] = useState(null);
  const [category_name, setCategory_name] = useState(null);
  const { item_subcategories } = useSelector((state) => ({
    ...state.item,
  }));

  useEffect(() => {
    dispatch(getSubcategories());
  }, [dispatch]);

  useEffect(() => {
    // Check if trowDetails already exists in local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      const trowDetails = JSON.parse(trowDetailsString);
      setEvent_name(trowDetails.event_name);
      setCategory_name(trowDetails.category_name);
    }
  }, []);

  const handleEventNameChange = (event) => {
    setEvent_name(event.target.value);
    // Retrieve "trowDetails" from local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      // Parse the retrieved string into an object
      const trowDetails = JSON.parse(trowDetailsString);
      // Update the username value
      trowDetails.event_name = event.target.value;
      // Convert the updated object back to a string
      const updatedTrowDetailsString = JSON.stringify(trowDetails);
      // Set the updated string back into local storage
      localStorage.setItem("trowDetails", updatedTrowDetailsString);
    }
  };

  const handleEventCategoryChange = (event) => {
    setCategory_name(event.target.value);
    // Retrieve "trowDetails" from local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      // Parse the retrieved string into an object
      const trowDetails = JSON.parse(trowDetailsString);
      // Update the username value
      trowDetails.category_name = event.target.value;
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
          Event Name
        </Typography>

        <TextField
          value={event_name || ""}
          margin="normal"
          fullWidth
          size="normal"
          id="event_name"
          label="Enter Gift/Event Name"
          name="event_name"
          onChange={handleEventNameChange}
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
                <FormatAlignCenterIcon color="primary" />
              </InputAdornment>
            ),
          }}
          margin="normal"
          size="normal"
          fullWidth
          select
          name="category_name"
          label="Select Category"
          type="text"
          id="category_name"
          value={category_name}
          onChange={handleEventCategoryChange}
        >
          {category_name? null : <MenuItem value="" disabled>Choose Category</MenuItem>}
          {item_subcategories.map((item, index) => (
                <MenuItem value={item.id} key={index + 300}>
                  {item.sub_cat_name}
                </MenuItem>
              ))}

          </TextField>
      </Box>
    </Box>
  );
};

export default EventName;

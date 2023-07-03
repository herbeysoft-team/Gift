import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  IconButton,
  Checkbox,
  Autocomplete,
  Avatar,
  Button,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import { getSubcategories } from "../context/features/itemSlice";
import { getUsersToGift } from "../context/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CropEasy from "../components/Crop/CropEasy";
import toast from "react-hot-toast";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { createEvent } from "../context/features/trowSlice";
import { useNavigate } from "react-router-dom";


const CreateEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [event_name, setEvent_name] = useState(null);
  const [category_name, setCategory_name] = useState("");
  const [event_purpose, setEvent_purpose] = useState(null);
  const [event_date, setEvent_date] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState(null);
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const { item_subcategories } = useSelector((state) => ({
    ...state.item,
  }));
  const { usersToGift } = useSelector((state) => ({ ...state.user }));

  useEffect(() => {
    dispatch(getSubcategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsersToGift());
  }, [dispatch]);

  const handleEventNameChange = (event) => {
    setEvent_name(event.target.value);
  };

  const handleEventCategoryChange = (event) => {
    setCategory_name(event.target.value);
  };

  const handleEventPurposeChange = (event) => {
    setEvent_purpose(event.target.value);
  };

  const handleEventDateChange = (newValue) => {
    setEvent_date(newValue.format("YYYY-MM-DD"));
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleUsernameChange = (event, newValue) => {
    setUsername(newValue);
  };

  const handleOnChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
        setPhotoURL(URL.createObjectURL(file));
        setOpenCrop(true);
      }
    }
  };

  const onChooseImg = () => {
    inputRef.current.click();
  };

  const handleSubmitTrow = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload event image");
    }
    if (isChecked && !username) {
      toast.error("Please enter username of the host");
    }
    if (!event_name) {
      toast.error("Please enter event name");
    }
    if (!event_purpose) {
      toast.error("Please enter event category");
    }
    if (!event_purpose) {
      toast.error("Please enter event date");
    }
    if (event_name && event_purpose && category_name && event_date) {
      const formData = new FormData();
        formData.append('file', file);
        formData.append('username', isChecked ? username.phone_no : null);
        formData.append('event_name', event_name);
        formData.append('event_purpose', event_purpose);
        formData.append('category_name', category_name);
        formData.append('event_date', event_date);
      //   formData.append('recommended_gift', recommended_gift);
       dispatch(createEvent({formData, navigate, toast}))
    } else {
        toast.error("Please fill in the neccesary details")
    }
  };

  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
      <MobileNavBar logo={Logo} title={"Create Event"} />
      {/* Header section  */}
      {/* <Header logo={TrowboxIcon} title={"Create Event/Trowbox"} /> */}

      {/* The event input here */}
      {!openCrop ? (
        <Box
          component="form"
          noValidate
          sx={{
            my: 5,
            marginX: { xs: "0.5rem", md: "0.5rem", lg: "3rem" },
            p: 2,
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
            label="Event Name"
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
            {category_name ? null : (
              <MenuItem value="" disabled>
                Choose Category
              </MenuItem>
            )}
            {item_subcategories.map((item, index) => (
              <MenuItem value={item.id} key={index + 300}>
                {item.sub_cat_name}
              </MenuItem>
            ))}
          </TextField>
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
            label="Reason for the Event"
            name="event_purpose"
            value={event_purpose || ""}
            onChange={handleEventPurposeChange}
          />
          <Typography
            variant="body"
            color={"primary"}
            sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
          >
            Event Time
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body"
              color={"primary"}
              sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
            >
              This event is for someone ?
            </Typography>
            <IconButton aria-label="wishlist" size="large">
              <Checkbox
                icon={
                  <CheckBoxOutlineBlankIcon
                    sx={{ color: "purple", fontSize: 24 }}
                  />
                }
                checkedIcon={
                  <CheckBoxIcon sx={{ color: "purple", fontSize: 24 }} />
                }
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </IconButton>
          </Box>
          {isChecked ? (
            <>
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
                value={username || null}
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
              />{" "}
            </>
          ) : null}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!file ? (
              <IconButton
                aria-label="insert"
                size="large"
                color="primary"
                onClick={onChooseImg}
              >
                <InsertPhotoOutlinedIcon sx={{ width: 100, height: 100 }} />
              </IconButton>
            ) : (
              <Avatar
                src={photoURL}
                alt="thumbnail"
                variant="square"
                onClick={onChooseImg}
                sx={{ width: 100, height: 75 }}
              />
            )}

            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleOnChange}
              style={{ display: "none" }}
            />
            <Typography
              variant="body"
              color={"primary"}
              sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
            >
              Select Picture for the Event
            </Typography>
          </Box>
          {/* Trow Button */}
          <Box
            display="flex"
            alignContent="center"
            justifyContent="center"
            my={2}
          >
            <Button
              variant="contained"
              endIcon={<ArrowRightAltIcon />}
              onClick={handleSubmitTrow}
            >
              Trow It !!!
            </Button>
          </Box>
        </Box>
      ) : (
        <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
      )}
    </Box>
  );
};

export default CreateEvent;

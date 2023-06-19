import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import toast from "react-hot-toast";
import {
  Avatar,
  Box,
  CardMedia,
  Checkbox,
  Divider,
  Fab,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import MobileNavBar from "../components/MobileNavBar";
import { createReTrow } from "../context/features/trowSlice";
import Logo from "../assets/logo.png";
import URLBASE from "../constant/urlbase";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MobileSearchBox from "../components/MobileSearchBox";
import { deepPurple } from "@mui/material/colors";
import RedoIcon from "@mui/icons-material/Redo";

const ReTrowBox = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { searchUsers } = useSelector((state) => ({ ...state.user }));
  const [event_date, setEvent_date] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const post = location.state;

  const handleProfile = (id) => {
    if (id) {
      navigate(`/home/profile/${id}`);
    }
  };
  const handleEventDateChange = (newValue) => {
    setEvent_date(newValue.format("YYYY-MM-DD"));
  };

  const handleCheckboxChange = (userId) => {
    const isSelected = selectedUsers.includes(userId);
    // If user is already selected, return without making any changes
    if (isSelected) {
      return;
    }

    // Deselect all users except the current one
    const updatedUsers = [userId];
    setSelectedUsers(updatedUsers);
  };

  const handleRetrow = (e) => {
    console.log(selectedUsers);
    e.preventDefault();
    //Function to retrow
    if (!event_date) {
      toast.error("please pick a date");
    } else {
      dispatch(
        createReTrow({
          formData: {
            phone_number: selectedUsers[0],
            event_name: post?.event_name,
            event_purpose: post?.event_purpose,
            category_name: post?.event_category,
            event_date: event_date,
            event_id: post?.id,
            event_pic: post?.event_pics,
          },
          navigate,
          toast,
        })
      );
    }
  };
  return (
    <Box flex={3}>
      <MobileNavBar logo={Logo} title={"Retrow"} />

      <MobileSearchBox />
      {/* The Event Details Start Here  */}
      <Box
        position="sticky"
        sx={{
          marginTop: 1,
          marginRight: 1,
          marginLeft: 1,
          marginBottom: 3,
          top: 10,
          left: 0,
          right: 0,
          boxShadow: "1",
          borderRadius: "5",
          zIndex: 2,
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="auto"
            fit="cover"
            image={`${URLBASE.imageBaseUrl}${post?.event_pics}`}
            alt="Event Image"
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0.2,
              backgroundColor: "white",
              opacity: 0.7,
              px: 1,
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              fontFamily="Poppins"
              fontWeight="mediuum"
            >
              {post?.event_name.length > 20
                ? `${post?.event_name.substring(0, 17)}...`
                : post?.event_name}
            </Typography>
            <Divider />
            <Typography variant="caption" color="primary" fontFamily="Poppins">
              {post?.event_purpose.length > 30
                ? `${post?.event_purpose.substring(0, 27)}...`
                : post?.event_purpose}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          justifyItems="center"
          sx={{ backgroundColor: "white", p: 1, zIndex: 2 }}
        >
          <Box sx={{ width: "100%" }}>
            {/* <DatePicker label="Responsive variant" defaultValue={dayjs('2022-04-17')} /> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                minDate={dayjs("2023-04-01")}
                value={event_date ? dayjs(event_date) : null}
                onChange={handleEventDateChange}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        {/* the users to retrow  */}
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            py={1}
            px={1}
            gap={1}
            sx={{ justifyContent: "center" }}
          >
            {searchUsers.map((user, index) => {
              return (
                <Box
                  key={user.userId}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 0.1,
                    gap: 1,
                    flex: 3,
                    borderBottom: "1px solid #aaa",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      alt="PP"
                      src={`${URLBASE.imageBaseUrl}${user?.profilePic}`}
                      sx={{ bgcolor: deepPurple[500] }}
                      onClick={() => handleProfile(user.userId)}
                    />
                    <Typography variant="body">{user?.fullname}</Typography>
                  </Box>

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
                      checked={selectedUsers?.includes(user?.phone_no)}
                      onChange={() => handleCheckboxChange(user?.phone_no)}
                    />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
          {selectedUsers.length > 0 ? (
            <Tooltip
              onClick={handleRetrow}
              title="Retrow"
              sx={{
                position: "fixed",
                bottom: 40,
                left: { xs: "calc(50% - 25px)", md: 30 },
              }}
            >
              <Fab color="primary" aria-label="Add Item">
                <RedoIcon />
              </Fab>
            </Tooltip>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ReTrowBox;

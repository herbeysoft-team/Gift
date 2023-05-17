import {
  Avatar,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MobileNavBar from "../components/MobileNavBar";
import ProfilePic from "../assets/profile.png";
import { deepPurple } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfile,
  updateUserProfile,
} from "../context/features/userSlice";
import toast from "react-hot-toast";
import URL from '../constant/url';

const initialState = {
  fullname: "",
  username: "",
  city: "",
  phoneno: "",
  gender: "",
  password: "",
};
const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: theme.palette.primary.main,
  paddingRight: 20,
  paddingLeft: 20,
  paddingY: 2,
  fontSize: 12,
  fontFamily: "Poppins",
  justifyContent: "center",
  borderRadius: 20,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const EditButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  paddingRight: 10,
  paddingLeft: 10,
  paddingY: 2,
  fontSize: 10,
  fontFamily: "Poppins",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
}));
const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useLocation().pathname.split("/")[3];
  const [formValue, setFormValue] = useState(initialState);
  const { userProfile } = useSelector((state) => ({ ...state.user }));
  const { phone_no, password, fullname, city, gender, username } = formValue;
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userProfile) {
      setFormValue(userProfile);
    }
  }, [userProfile]);

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    if (fullname && username && gender && city) {
      dispatch(
        updateUserProfile({
          updatedValue: {
            fullname,
            username,
            gender,
            city,
          },
          toast,
        })
      );
    }
  };

  const handleUpdateProfile = () => {
    navigate("/home/changeprofilepic");
  };

  return (
    <Box flex={3}>
      <MobileNavBar logo={ProfilePic} title={"Update Profile"} />
      {/* Profile Section */}
      <Box
        p={2}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mb: 10,
        }}
      >
        <Avatar
          alt="PP"
          src={`${URL.imageBaseUrl}${userProfile?.profilePic}`}
          sx={{ bgcolor: deepPurple[500], width: 100, height: 100 }}
        />
        <EditButton onClick={handleUpdateProfile}>Change Picture</EditButton>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              type="text"
              id="fullname"
              name="fullname"
              label="Full Name"
              value={fullname || ""}
              size="normal"
              color="primary"
              margin="dense"
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              type="text"
              id="username"
              name="username"
              label="Username"
              value={username || ""}
              size="normal"
              color="primary"
              margin="dense"
              onChange={onInputChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ width: "100%" }}
              required
              type="text"
              id="city"
              name="city"
              label="City, Country"
              value={city || ""}
              size="normal"
              color="primary"
              margin="dense"
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              sx={{ width: "100%" }}
              id="gender"
              select
              value={gender || ""}
              name="gender"
              label="Gender"
              margin="dense"
              size="normal"
              onChange={onInputChange}
              autoFocus
            >
              <MenuItem value="0">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ width: "100%", color: "red" }}
              disabled
              type="text"
              id="phone_no"
              name="phone_no"
              label="Phone Number"
              value={phone_no || ""}
              size="normal"
              color="primary"
              margin="dense"
              // onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ width: "100%" }}
              disabled
              type="password"
              id="password"
              name="password"
              label="Password"
              value={password || ""}
              size="normal"
              color="primary"
              margin="dense"
              // onChange={onInputChange}
            />
          </Grid>
        </Grid>
        <CustomButton onClick={onSubmitUpdate}>Update Profile</CustomButton>
      </Box>
    </Box>
  );
};

export default UpdateProfile;
 
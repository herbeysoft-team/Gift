import {
  Box,
  Avatar,
  Typography,
  styled,
  Button,
  ToggleButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MobileNavBar from "../components/MobileNavBar";
import ProfilePic from "../assets/profile.png";
import { deepPurple } from "@mui/material/colors";
import Received from "../assets/Gift_Received.png";
import Sent from "../assets/Gift_Sent.png";
import DragHandleSharpIcon from "@mui/icons-material/DragHandleSharp";
import ProfileNavTabs from "../components/ProfileNavTabs";
import { useLocation } from "react-router-dom";
import {  useSelector } from "react-redux";

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  paddingRight: 20,
  paddingLeft: 20,
  paddingY: 2,
  fontSize: 12,
  justifyContent: "center",
  border: "1px solid white",
  borderRadius: 20,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Profile = () => {
  const [drop, setDrop] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));

  const userId = parseInt(useLocation().pathname.split("/")[3]);

 
  return (
    <Box flex={3}>
      <MobileNavBar logo={ProfilePic} title={"Profile"} />
      {/* Profile Section */}
      <Box
        p={2}
        sx={{
          elevation: 2,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
          gap: 1,
          backgroundColor: "#642c8e",
        }}
      >
        <Avatar
          alt="PP"
          src=""
          sx={{ bgcolor: deepPurple[500], width: 64, height: 64 }}
        />
        <Typography
          variant="heading"
          sx={{
            color: "white",
            fontSize: 24,
            fontWeight: "medium",
            fontFamily: "Poppins",
          }}
        >
          Maria Lawal
        </Typography>
        <Typography
          variant="subheading"
          sx={{ color: "white", fontSize: 16, fontFamily: "Poppins", mt: -2 }}
        >
          @maria_lawal
        </Typography>
        <Typography
          variant="subheading"
          sx={{ color: "white", fontSize: 16, fontFamily: "Poppins", mt: 0 }}
        >
          Bauchi, Nigeria
        </Typography>
        {/* Profile Info Boxes Here  */}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            paddingX: 1,
            paddingY: 1,
            gap: 1,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              paddingY: 1,
              paddingX: 2,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="heading"
              sx={{ fontSize: 16, fontFamily: "Poppins" }}
            >
              879
            </Typography>
            <Typography variant="subheading">Upvote</Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              paddingY: 1,
              paddingX: 2,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="heading"
              sx={{ fontSize: 16, fontFamily: "Poppins" }}
            >
              879
            </Typography>
            <Typography variant="subheading">Follower</Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              paddingY: 1,
              paddingX: 2,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="heading"
              sx={{ fontSize: 16, fontFamily: "Poppins" }}
            >
              879
            </Typography>
            <Typography variant="subheading">Following</Typography>
          </Box>
        </Box>
        {/* Gift Info Boxes Here  */}
        {drop ? (
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              paddingX: 1,
              paddingY: 1,
              gap: 2,
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                paddingY: 2,
                paddingX: 2,
                borderRadius: 1,
                border: "1px solid #d676af",
                gap: 1,
              }}
            >
              <Typography
                variant="body"
                sx={{ color: "white", fontSize: 24, fontFamily: "Poppins" }}
              >
                243
              </Typography>
              <img src={Sent} alt="logo" />
            </Box>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                paddingY: 2,
                paddingX: 2,
                borderRadius: 1,
                border: "1px solid #d676af",
                gap: 1,
              }}
            >
              <Typography
                variant="body"
                sx={{ color: "white", fontSize: 24, fontFamily: "Poppins" }}
              >
                243
              </Typography>
              <img src={Received} alt="logo" />
            </Box>
          </Box>
        ) : null}
        {/* Action Buttons Here */}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            paddingX: 1,
            paddingY: 1,
            gap: 2,
          }}
        >
          <CustomButton>Follow</CustomButton>
          <CustomButton>Message</CustomButton>
        </Box>
        {/* Drop Down Button */}
        <ToggleButton
          value="check"
          selected={drop}
          onChange={() => {
            setDrop(!drop);
          }}
        >
          <DragHandleSharpIcon htmlColor="#fff" />
        </ToggleButton>
      </Box>

      {/* Other part Start here */}
      <ProfileNavTabs />
    </Box>
  );
};

export default Profile;

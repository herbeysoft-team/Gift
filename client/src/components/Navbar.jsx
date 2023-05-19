import { AppBar, Toolbar, Box, Typography, Badge, Avatar } from "@mui/material";
import React from "react";
import Logo from "../assets/logo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import { deepPurple } from "@mui/material/colors";
import {  useSelector } from "react-redux";
import SearchCard from "./SearchCard";
import { useNavigate} from "react-router-dom";
import URLBASE from '../constant/urlbase';

const Navbar = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "space-between",
          gap: 10,
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="heading"
            fontFamily="Poppins"
            alignItems="center"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <img src={Logo} alt="logo" />
            TrowBox
          </Typography>
        </Box>
        <SearchCard />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Badge badgeContent={1} color="error" variant="dot">
            <NotificationsIcon htmlColor="#642c8e" />
          </Badge>
          <Badge badgeContent={1} color="error" variant="dot" invisible={true}>
            <EmailIcon color="inherit" htmlColor="#642c8e" />
          </Badge>
          <Avatar
            onClick={(e) => navigate(`/home/profile/${user?.result?.id}`)}
            alt="PP"
            src={`${URLBASE.imageBaseUrl}${user?.result?.profilePic}`}
            sx={{ bgcolor: deepPurple[500] }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

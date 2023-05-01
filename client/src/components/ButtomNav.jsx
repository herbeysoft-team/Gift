import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";
import Home from "../assets/Home.png";
import Shopping from "../assets/shopping-bag.png";
import Logo from "../assets/logo.png";
import Profile from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";

const ButtomNav = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        paddingY: 0.5,
        display: { lg: "none" },
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue === 0) {
            navigate("/home");
          } else if (newValue === 1) {
            navigate("/home/shop");
          } else if (newValue === 2) {
            navigate("/home/trowbox");
          } else if (newValue === 3) {
            navigate(`/home/profile/${user?.result?.id}`);
          }
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<img src={Home} alt="Home" width={32} height={32} />}
        />
        <BottomNavigationAction
          label="Gift Shop"
          icon={<img src={Shopping} alt="shop" width={32} height={32} />}
        />
        <BottomNavigationAction
          label="Trowbox"
          icon={<img src={Logo} alt="trowbox" width={32} height={32} />}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<img src={Profile} alt="profile" width={32} height={32} />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default ButtomNav;

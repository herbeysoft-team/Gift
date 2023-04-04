import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";
import Home from "../assets/Home.png";
import Shopping from "../assets/shopping-bag.png";
import Logo from "../assets/logo.png";
import Profile from "../assets/profile.png";

const ButtomNav = () => {
  const [value, setValue] = useState(0);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, paddingY:0.5, display: {md: "none" }}}
      elevation={3}
      
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue === 0) {
            //Navigate to somewhere
          } else if (newValue === 1) {
            //Navigate to somewhere
          } else if (newValue === 2) {
            //Navigate to somewhere
          } else if (newValue === 3) {
            //Navigate to somewhere
          }
        }}
      >
        <BottomNavigationAction label="Home" icon={<img src={Home} alt="Home" width={32} height={32}/>} />
        <BottomNavigationAction label="Gift Shop" icon={<img src={Shopping} alt="shop" width={32} height={32}/>} />
        <BottomNavigationAction label="Trowbox" icon={<img src={Logo} alt="trowbox" width={32} height={32}/>} />
        <BottomNavigationAction label="Profile" icon={<img src={Profile} alt="profile" width={32} height={32}/>} />
      </BottomNavigation>
    </Paper>
  );
};

export default ButtomNav;

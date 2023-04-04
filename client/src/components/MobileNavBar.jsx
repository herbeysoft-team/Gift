import React from 'react'
import { Box,Typography, AppBar, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import Logo from "../assets/logo.png";

const MobileNavBar = () => {
  return (
    <AppBar
        position="sticky"
        elevation={1}
        sx={{
          display: { xs: "flex", md: "none" },
          backgroundColor: "white",
          paddingY: 2,
          paddingX: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
          <img src={Logo} alt="logo" />
          <Typography variant="h6" color="primary">
            Home
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
        <Badge badgeContent={1} color="error" variant="dot" invisible={false}>
          <EmailIcon color="inherit" htmlColor="#642c8e" sx={{ fontSize: 32 }}/>
        </Badge>
        <Badge badgeContent={1} color="error" variant="dot" invisible={false}>
          <NotificationsIcon htmlColor="#642c8e" sx={{ fontSize: 32 }}/>
        </Badge>
        
        </Box>
      </AppBar>
  )
}

export default MobileNavBar

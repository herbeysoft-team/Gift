import React from 'react'
import { Box,Typography, AppBar, Badge} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from '@mui/icons-material/Search';
import { useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";

const MobileNavBar = ({logo, title}) => {
  const navigate = useNavigate();
  const { hasunreadnotification } = useSelector((state) => ({ ...state.notification }));
  const { hasnounreadmessages } = useSelector((state) => ({ ...state.message }));


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
          <img src={logo} alt="logo" />
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
        </Box>
        
        <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
        <Badge badgeContent={1} color="error" variant="dot" invisible={true} onClick={(e)=>navigate("/home/search")}>
         <SearchIcon  htmlColor="#642c8e" sx={{ fontSize: 32 }} />
        </Badge>
        <Badge badgeContent={1} color="error" variant="dot" invisible={hasnounreadmessages} onClick={(e)=>navigate("/home/message")}>
          <EmailIcon color="inherit" htmlColor="#642c8e" sx={{ fontSize: 32 }}/>
        </Badge>
        <Badge badgeContent={1} color="error" variant="dot" invisible={!hasunreadnotification} onClick={(e)=>navigate("/home/notification")}>
          <NotificationsIcon htmlColor="#642c8e" sx={{ fontSize: 32 }}/>
        </Badge>
        
        </Box>
      </AppBar>
  )
}

export default MobileNavBar

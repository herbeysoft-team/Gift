import { Box, CardMedia, Icon, Typography } from "@mui/material";
import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
const ScheduleCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: 1,
      }}
    >
      <Box sx={{ position: "relative", flex: 3 }}>
        <CardMedia
          component="img"
          height="150px"
          fit="cover"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiJVY49pfc2JokIUlq6piKVOl89eUB9lO0zDyUpF_POPWBuGtgSj5Tkac&s"
          alt="Schedule Event"
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            display: "flex",
            flexDirection: "row",
            gap: 1,
            backgroundColor: "white",
            opacity: 0.6,
            px: 1,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", flex: 3 }}>
            <Typography
              variant="h6"
              color="primary"
              fontFamily="Poppins"
              fontWeight="mediuum"
            >
              Get together
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 5,
            left: 5,

            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon fontSize={"large"}>
            <AccessAlarmIcon fontSize={"large"} color="secondary" />
          </Icon>
        </Box>
      </Box>
      <Box sx={{ flex: 1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <EventNoteIcon fontSize={"large"} color="primary" sx={{fontSize:80}} />
        <Typography variant="caption" sx={{fontFamily:"Poppins"}}>20/03/2023</Typography>
      </Box>
    </Box>
  );
};

export default ScheduleCard;

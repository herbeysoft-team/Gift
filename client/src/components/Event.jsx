import { Avatar,  Box, CardMedia, Divider,Typography } from '@mui/material'
import React from 'react'
import { deepPurple } from "@mui/material/colors";
import EventNoteIcon from "@mui/icons-material/EventNote";
import URLBASE from "../constant/urlbase";
import { useNavigate } from "react-router-dom";

const Event = ({box}) => {
 const navigate = useNavigate();
  const handleGoEvent = (id) =>{
    if(id){
        navigate(`/home/eventdetails/${id}`)
    }
   
  }

  const handleGoProfile = (id) =>{
    if(id){
        navigate(`/home/profile/${id}`)
    }
  }
  return (
    <Box
        sx={{
          marginTop: 1,
          marginRight: 1,
          marginLeft: 1,
          marginBottom: 3,
          boxShadow: "2",
          borderRadius: "5",
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="auto"
            fit="cover"
            image={`${URLBASE.imageBaseUrl}${box?.event_pics}`}
            alt="Event Image"
            onClick={() =>handleGoEvent(box?.id)}
          />
          <Box
          onClick={() =>handleGoEvent(box?.id)}
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
              {box?.event_name.length > 20
                ? `${box?.event_name.substring(0, 17)}...`
                : box?.event_name}
               
            </Typography>
            <Divider />
            <Typography variant="caption" color="primary" fontFamily="Poppins">
            {box?.event_purpose.length > 30
                ? `${box?.event_purpose.substring(0, 27)}...`
                : box?.event_purpose}
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
          <Box
            display="flex"
            flexDirection="row"
            gap={1}
            sx={{ justifyContent: "center", alignItems: "center" }}
            key={box?.userId}
            onClick={()=>handleGoProfile(box?.userId)}
          >
            <Avatar
              alt={`PP`}
              src={`${URLBASE.imageBaseUrl}${box?.profilePic}`}
              sx={{ bgcolor: deepPurple[500] }}
            />
            <Typography variant="body">
              {box?.fullname.length > 15
                ? `${box?.fullname.substring(0, 15)}...`
                : box?.fullname}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyItems="center"
            gap={1}
          >
            <EventNoteIcon fontSize={"large"} color="primary" />
            <Typography variant="caption" sx={{ fontFamily: "Poppins" }}>
              {box?.event_date}
             
            </Typography>
          </Box>
        </Box>
      </Box>
  )
}

export default Event

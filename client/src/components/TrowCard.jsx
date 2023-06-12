import { Box, CardMedia, Divider, Icon, Typography } from "@mui/material";
import React from "react";
import { CardGiftcard } from "@mui/icons-material";
import URLBASE from "../constant/urlbase";
import { useNavigate } from "react-router-dom";


const TrowCard = ({ box }) => {
  const navigate = useNavigate();
  const handleGoEvent = (id) => {
    if (id) {
      navigate(`/home/eventdetails/${id}`);
    }
  };


  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        
        <CardMedia
          component="img"
          height="10%"
          fit="cover"
          image={`${URLBASE.imageBaseUrl}${box?.event_pics}`}
          alt="Trowbox Pics"
          onClick={() => handleGoEvent(box?.id)}
        />
        {/* <IconButton
            aria-label="share"
            size="large"
            sx={{ position: "absolute", top: 5, right: 10 }}
            
            <IosShareIcon color="secondary" sx={{fontSize: 40 }}  />
            
          </IconButton> */}
        <Box
          onClick={() => handleGoEvent(box?.id)}
          sx={{
            position: "absolute",
            bottom: 10,
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
              {box?.event_name.length > 15
                ? `${box?.event_name.substring(0, 15)}...`
                : box?.event_name}
            </Typography>
            <Divider />
            <Typography variant="body" color="primary" fontFamily="Poppins">
              10 New upvotes
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon fontSize={"large"}>
              <CardGiftcard fontSize={"large"} color="secondary" />
            </Icon>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TrowCard;

import { Box, Typography } from "@mui/material";
import React from "react";
import NotifyIn from "../assets/NotifyIn.png";
import NotifyOut from "../assets/NotifyOut.png";
import Profile from "../assets/profile.png";
import NotifySentIcon from "../assets/NotifySentIcon.png";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const NotifyCard = ({ notification }) => {
  const navigate = useNavigate();

  const handleGoToLink = (id) => {
    if (
      notification?.content_type === "comment" ||
      notification?.content_type === "upvote"
    ) {
      navigate(`/home/postdetails/${id}`);
    } else if (notification?.content_type === "profile") {
      navigate(`/home/profile/${id}`);
    } else if (notification?.content_type === "event") {
      navigate(`/home/eventdetails/${id}`);
    } else if (
      notification?.content_type === "trowbox" &&
      notification?.activity === "trow"
    ) {
      navigate(`/home/trowboxprocess/${id}`);
    } else if (
      notification?.content_type === "trowbox" &&
      notification?.activity === "wishlist"
    ) {
      navigate(`/home/trowboxprocess/${id}`);
    } else if (
      notification?.content_type === "trowbox" &&
      notification?.activity === "gifting"
    ) {
      navigate(`/home/eventdetails/${id}`);
    } else if (
      notification?.content_type === "trowbox" &&
      notification?.activity === "retrow"
    ) {
      navigate(`/home/trowboxprocess/${id}`);
    } else if (notification?.content_type === "share") {
      navigate(`/home/postdetails/${id}`);
    }
  };
  return (
    <Box
      onClick={() => handleGoToLink(notification?.content_id)}
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        elevation: 2,
        boxShadow: 1,
        px: 2,
        py: 1,
        borderRadius: 2,
        my: 1,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 0.4,
          flex: 6,
        }}
      >
        {notification?.content_type === "comment" && (
          <img src={NotifyOut} alt="comment" width={32} height={32} />
        )}
        {notification?.content_type === "upvote" && (
          <img src={NotifyOut} alt="upvote" width={32} height={32} />
        )}
        {notification?.content_type === "profile" && (
          <img src={Profile} alt="profile" width={32} height={32} />
        )}
        {notification?.content_type === "event" && (
          <img src={NotifyIn} alt="event" width={32} height={32} />
        )}
        {notification?.content_type === "trowbox" && (
          <img src={NotifyOut} alt="trowbox" width={32} height={32} />
        )}
        {notification?.content_type === "share" && (
          <img src={NotifyOut} alt="trowbox" width={32} height={32} />
        )}
        <Typography
          variant="body"
          sx={{ fontFamily: "Poppins", color: "primary" }}
        >
          {notification?.notificationText}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "flex-end",
          flex: 2,
        }}
      >
        <img src={NotifySentIcon} alt="logo" width={24} height={24} />
        <Typography
          variant="caption"
          sx={{ fontFamily: "Poppins", color: "secondary", fontSize: "0.5rem" }}
        >
          {moment(notification?.date).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotifyCard;

import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import URLBASE from "../constant/urlbase";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const MessageBubble = ({ message, isSender }) => {
  const navigate = useNavigate();

  const handleGoPost = (id) => {
    if (id) {
      navigate(`/home/postdetails/${id}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isSender ? "flex-end" : "flex-start",
        marginBottom: 0.5,
      }}
    >
      <Box
        sx={{
          backgroundColor: isSender ? "#fff" : "#f0b2d7",
          padding: 1,
          borderRadius: 5,
          maxWidth: "80%",
          boxShadow: 1,
        }}
      >
        <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
          {message.contextText}
        </Typography>
        {message?.contentType === "media" && (
          <Avatar
            alt="Post"
            variant="square"
            src={`${URLBASE.imageBaseUrl}${message?.contentMediaPics}`}
            sx={{ bgcolor: deepPurple[500], width: 200, height: 158 }}
            onClick={() => handleGoPost(message?.contentMediaId)}
          />
        )}
        <Typography variant="caption" sx={{ fontFamily: "Poppins", fontSize:"0.5rem", alignSelf:"flex-end" }}>
          {moment(message?.timestamp).add(5, "hours").fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};

const MessageList = ({ messages, currentUser }) => {
  return (
    <Box sx={{ padding: 2 }}>
      {messages?.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isSender={message.senderId === currentUser}
        />
      ))}
    </Box>
  );
};

export default MessageList;

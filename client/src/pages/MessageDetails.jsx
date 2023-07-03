import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import MobileNavBar from "../components/MobileNavBar";
import ProfilePic from "../assets/profile.png";
import MessageBox from "../components/MessageBox";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../context/features/userSlice";
import { getMessages } from "../context/features/messageSlice";
import { deepPurple } from "@mui/material/colors";
import URLBASE from "../constant/urlbase";
import MessageList from "../components/MessageList";

const MessageDetails = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => ({ ...state.user }));
  const { messages, loadingmessages } = useSelector((state) => ({
    ...state.message,
  }));

  const id = useLocation().pathname.split("/")[3];

  useEffect(() => {
    if (id) {
      dispatch(getUserProfile(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getMessages(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
      <MobileNavBar logo={ProfilePic} title={"Messages"} />
      <Box
        sx={{
          marginTop: 1,
          marginRight: 1,
          marginLeft: 1,
          marginBottom: 5,
          borderRadius: "5",
          minHeight: "80vh",
          paddingBottom: "100px",
        }}
      >
        <Box
          p={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            boxShadow: 1,
            gap: 1,
          }}
        >
          <Avatar
            alt="PP"
            src={`${URLBASE.imageBaseUrl}${userProfile?.profilePic}`}
            sx={{ bgcolor: deepPurple[500], width: 64, height: 64 }}
          />
          <Typography
            variant="heading"
            sx={{
              color: "secondary",
              fontSize: 24,
              fontWeight: "medium",
              fontFamily: "Poppins",
            }}
          >
            {userProfile?.fullname}
          </Typography>
          <Typography
            variant="subheading"
            sx={{
              color: "primary",
              fontSize: 16,
              fontFamily: "Poppins",
              mt: -2,
            }}
          >
            {`@${userProfile?.username}`}
          </Typography>
        </Box>
        {!loadingmessages ? (
          <>
            <MessageList messages={messages} currentUser={userProfile?.id} />
          </>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="200px" /* Adjust the height as needed */
          >
            <CircularProgress size={52} color="secondary" />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          padding: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <MessageBox userId={id} />
      </Box>
    </Box>
  );
};

export default MessageDetails;

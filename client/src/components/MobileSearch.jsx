import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import MobileNavBar from "./MobileNavBar";
import Logo from "../assets/logo.png";
import MobileSearchBox from "./MobileSearchBox";
import { useSelector } from "react-redux";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import URLBASE from "../constant/urlbase";

const MobileSearch = () => {
  const { searchUsers, loadingusers } = useSelector((state) => ({ ...state.user }));
  const navigate = useNavigate();
  const handleProfile = (id) => {
    if (id) {
      navigate(`/home/profile/${id}`);
    }
  };

  return (
    <Box flex={3}>
      {/* header */}
      <MobileNavBar logo={Logo} title={"Search"} />
      {/* Mobile search bar */}
      <MobileSearchBox />
      {!loadingusers ? (
      <Box>
        <Box display="flex" flexDirection="column" py={2} px={1} gap={1} sx={{ justifyContent: "center" }}>
          {searchUsers.map((user, index) => {
            return (
              <Box
                onClick={() => handleProfile(user.userId)}
                key={user.userId}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  p:0.5,
                  gap: 1,
                  flex: 3,
                  borderBottom:"1px solid #aaa",
                }}
              >
                <Avatar
                  alt="PP"
                  src={`${URLBASE.imageBaseUrl}${user?.profilePic}`}
                  sx={{ bgcolor: deepPurple[500] }}
                />
                <Typography variant="body">{user?.fullname}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
      ):(
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
  );
};

export default MobileSearch;

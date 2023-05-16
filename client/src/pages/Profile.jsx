import toast from "react-hot-toast";
import {
  Box,
  Avatar,
  Typography,
  styled,
  Button,
  ToggleButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MobileNavBar from "../components/MobileNavBar";
import ProfilePic from "../assets/profile.png";
import { deepPurple } from "@mui/material/colors";
import Received from "../assets/Gift_Received.png";
import Sent from "../assets/Gift_Sent.png";
import DragHandleSharpIcon from "@mui/icons-material/DragHandleSharp";
import ProfileNavTabs from "../components/ProfileNavTabs";
import { useLocation, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../context/features/userSlice";
import {
  countRelationship,
  checkRelationship,
  addRelationship,
  deleteRelationship,
} from "../context/features/relationshipSlice";

const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  paddingRight: 20,
  paddingLeft: 20,
  paddingY: 2,
  fontSize: 12,
  justifyContent: "center",
  border: "1px solid white",
  borderRadius: 20,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drop, setDrop] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userProfile } = useSelector((state) => ({ ...state.user }));
  const { countFollow, checkFollow } = useSelector((state) => ({
    ...state.relationship,
  }));
  const [isFollowing, setIsFollowing] = useState(false);

  const userId = useLocation().pathname.split("/")[3];

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
      dispatch(countRelationship(userId));
      dispatch(checkRelationship(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (checkFollow) {
      setIsFollowing(checkFollow === 1);
    }
  }, [checkFollow]);

  const handleFollow = () => {
    if (isFollowing) {
      //unfolow the user
      dispatch(deleteRelationship({ userId, toast }));
      dispatch(countRelationship(userId));
      setIsFollowing(false);
    } else {
      //follow the user
      dispatch(addRelationship({ userId, toast }));
      dispatch(countRelationship(userId));
      setIsFollowing(true);
    }
  };

  const handleUpdate = () => {
    navigate(`/home/updateprofile/${user?.result?.id}`);
  };

  const handleMessage = () => {};

  const handleContact = () => {};

  return (
    <Box flex={3}>
      <MobileNavBar logo={ProfilePic} title={"Profile"} />
      {/* Profile Section */}
      <Box
        p={2}
        sx={{
          elevation: 2,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
          gap: 1,
          backgroundColor: "#642c8e",
        }}
      >
        <Avatar
          alt="PP"
          src={userProfile?.profilePic}
          sx={{ bgcolor: deepPurple[500], width: 64, height: 64 }}
        />
        <Typography
          variant="heading"
          sx={{
            color: "white",
            fontSize: 24,
            fontWeight: "medium",
            fontFamily: "Poppins",
          }}
        >
          {userProfile?.fullname}
        </Typography>
        <Typography
          variant="subheading"
          sx={{ color: "white", fontSize: 16, fontFamily: "Poppins", mt: -2 }}
        >
          {`@${userProfile?.username}`}
        </Typography>
        <Typography
          variant="subheading"
          sx={{ color: "white", fontSize: 16, fontFamily: "Poppins", mt: 0 }}
        >
          {userProfile?.city}
        </Typography>
        {/* Profile Info Boxes Here  */}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            paddingX: 1,
            paddingY: 1,
            gap: 1,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              paddingY: 1,
              paddingX: 2,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="heading"
              sx={{ fontSize: 16, fontFamily: "Poppins" }}
            >
              879
            </Typography>
            <Typography variant="subheading">Upvote</Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              paddingY: 1,
              paddingX: 2,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="heading"
              sx={{ fontSize: 16, fontFamily: "Poppins" }}
            >
              {countFollow?.countfollower?.num_followers}
            </Typography>
            <Typography variant="subheading">Follower</Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              paddingY: 1,
              paddingX: 2,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="heading"
              sx={{ fontSize: 16, fontFamily: "Poppins" }}
            >
              {countFollow?.countfollowing?.num_following}
            </Typography>
            <Typography variant="subheading">Following</Typography>
          </Box>
        </Box>
        {/* Gift Info Boxes Here  */}
        {drop ? (
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              paddingX: 1,
              paddingY: 1,
              gap: 2,
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                paddingY: 2,
                paddingX: 2,
                borderRadius: 1,
                border: "1px solid #d676af",
                gap: 1,
              }}
            >
              <Typography
                variant="body"
                sx={{ color: "white", fontSize: 24, fontFamily: "Poppins" }}
              >
                243
              </Typography>
              <img src={Sent} alt="logo" />
            </Box>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                paddingY: 2,
                paddingX: 2,
                borderRadius: 1,
                border: "1px solid #d676af",
                gap: 1,
              }}
            >
              <Typography
                variant="body"
                sx={{ color: "white", fontSize: 24, fontFamily: "Poppins" }}
              >
                243
              </Typography>
              <img src={Received} alt="logo" />
            </Box>
          </Box>
        ) : null}
        {/* Action Buttons Here */}
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            paddingX: 1,
            paddingY: 1,
            gap: 2,
          }}
        >
          {user?.result?.id === userProfile?.id ? (
            <CustomButton onClick={handleUpdate}>Update</CustomButton>
          ) : (
            <CustomButton onClick={handleFollow}>
              {isFollowing ? "Following" : "Follow"}
            </CustomButton>
          )}
          {user?.result?.id === userProfile?.id ? (
            <CustomButton onClick={handleContact}>Contact</CustomButton>
          ) : (
            <CustomButton onClick={handleMessage}>Message</CustomButton>
          )}
        </Box>
        {/* Drop Down Button */}
        <ToggleButton
          value="check"
          selected={drop}
          onChange={() => {
            setDrop(!drop);
          }}
        >
          <DragHandleSharpIcon htmlColor="#fff" />
        </ToggleButton>
      </Box>

      {/* Other part Start here */}
      <ProfileNavTabs />
    </Box>
  );
};

export default Profile;

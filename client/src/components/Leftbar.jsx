import toast from 'react-hot-toast'
import React, { useEffect} from "react";
import {
  Box,
  Typography,
  Avatar,
  styled,
  Button,
  Divider,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { getUnfollowUsers } from "../context/features/userSlice";
import { addRelationship} from "../context/features/relationshipSlice";
import URLBASE from '../constant/urlbase';
import { useNavigate } from "react-router-dom";


const FollowButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  paddingLeft: 20,
  paddingRight: 20,
  fontSize: 10,
  justifyContent: "flex-end",
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Leftbar = () => {
  const dispatch = useDispatch();
  const { unfollowUsers } = useSelector((state) => ({ ...state.user }));
  const { loading } = useSelector((state) => ({ ...state.relationship }));
  const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate()

  const handleGoProfile = (id) => {
    if(id){
      navigate(`/home/profile/${id}`)
    }
  }

  useEffect(() => {
    if(user){
    dispatch(getUnfollowUsers(user?.result?.id));
    }
  }, [dispatch, user]);


  const handleFollow = (id) => {
    if(id){
      dispatch(addRelationship({userId: id, toast}));
      dispatch(getUnfollowUsers(user?.result?.id));
    }
  }

  return (
    <Box
      flex={1.5}
      p={2}
      height="100vh"
      sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block" } }}
    >
      <Box position="fixed">
        <Typography
          variant="body"
          sx={{ fontWeight: "medium", fontSize: "18px" }}
        >
          Suggestions For You
        </Typography>
        <Divider sx={{ height: "10px", marginBottom: "20px" }} />
        {unfollowUsers.map((user, index) => {
          return (
            <Box
              display="flex"
              gap={5}
              sx={{ justifyContent: "space-between", mb: 2 }}
              key={user.unfollowId}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  flex: 3,
                }}
              >
                <Avatar
                  alt="PP"
                  src={`${URLBASE.imageBaseUrl}${user?.profilePic}`}
                  sx={{ bgcolor: deepPurple[500] }}
                  onClick={()=> handleGoProfile(user?.unfollowId)}
                />
                <Typography variant="body">{user?.fullname}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                }}
              >
                <FollowButton onClick={()=>handleFollow(user?.unfollowId)}>{loading?"Loading..":"Follow"}</FollowButton>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Leftbar;

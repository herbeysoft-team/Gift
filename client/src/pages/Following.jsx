import React, {useEffect, useMemo} from 'react'
import {
    getFollowings
  } from "../context/features/relationshipSlice";
import { useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress, Typography } from '@mui/material';
import MobileNavBar from '../components/MobileNavBar';
import ProfilePic from "../assets/profile.png";
import ProfileUserBox from '../components/ProfileUserBox';

const Folowing = () => {
  const dispatch = useDispatch();  
  const userId = useLocation().pathname.split("/")[3];
  const { followings, loadingfollowing } = useSelector((state) => ({
    ...state.relationship,
  }));

  useEffect(() => {
    if (userId) {
      dispatch(getFollowings(userId))
    }
  }, [userId, dispatch]);

  const memoizedFollowing = useMemo(() => followings, [followings]);

  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
      <MobileNavBar logo={ProfilePic} title={"Following"} />

       {/* Other Sections start here */}
       <Box
        sx={{
          width: "100%",
          px: 1,
          py: 0.5,
          mb:10,
        }}
      >
        {!loadingfollowing ? <>
        {memoizedFollowing.length > 0 ? (
          <>
            {memoizedFollowing.map((user, index) => {
              return (
                <ProfileUserBox key={user.id} user={user} />
              );
            })}
          </>
        ) : (
          <Typography
            variant="h5"
            color="primary"
            fontFamily="Poppins"
            fontWeight="medium"
            textAlign="center"
          >
            No Following
          </Typography>
        )}
        </> : (
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

      </Box>
  )
}

export default Folowing

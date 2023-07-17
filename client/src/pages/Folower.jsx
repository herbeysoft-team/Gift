import React, {useEffect, useMemo} from 'react'
import {
    getFollowers
  } from "../context/features/relationshipSlice";
import { useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, CircularProgress, Typography } from '@mui/material';
import MobileNavBar from '../components/MobileNavBar';
import ProfilePic from "../assets/profile.png";
import ProfileUserBox from '../components/ProfileUserBox';

const Folower = () => {
  const dispatch = useDispatch();  
  const userId = useLocation().pathname.split("/")[3];
  const { followers, loadingfollowers } = useSelector((state) => ({
    ...state.relationship,
  }));

  useEffect(() => {
    if (userId) {
      dispatch(getFollowers(userId))
    }
  }, [userId, dispatch]);

  const memoizedFollower = useMemo(() => followers, [followers]);

  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
      <MobileNavBar logo={ProfilePic} title={"Follower"} />

       {/* Other Sections start here */}
       <Box
        sx={{
          width: "100%",
          px: 1,
          py: 0.5,
          mb:10,
        }}
      >
        {!loadingfollowers ? <>
        {memoizedFollower.length > 0 ? (
          <>
            {memoizedFollower.map((user, index) => {
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
            No Follower
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

export default Folower

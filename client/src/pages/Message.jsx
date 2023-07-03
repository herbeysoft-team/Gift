import { Box, CircularProgress, Typography } from '@mui/material'
import React, {useEffect, useMemo} from 'react'
import MobileNavBar from '../components/MobileNavBar'
import ProfilePic from "../assets/profile.png";
import { useSelector, useDispatch } from "react-redux";
import { getMessagesUsers } from "../context/features/messageSlice";
import MessageUserBox from '../components/MessageUserBox';

const Message = () => {
  const dispatch = useDispatch();
  const { messagesusers, loadingmessageusers } = useSelector((state) => ({ ...state.message }));

  useEffect(()=>{
    dispatch(getMessagesUsers())
  },[dispatch])

  const memoizedUsers = useMemo(() => messagesusers, [messagesusers]);
  
  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
    <MobileNavBar logo={ProfilePic} title={"Messages"} />

    
      {/* Other Sections start here */}
      <Box
        sx={{
          width: "100%",
          px: 1,
          py: 0.5,
          mb:10,
        }}
      >
        {!loadingmessageusers ? <>
        {memoizedUsers.length > 0 ? (
          <>
            {memoizedUsers.map((user, index) => {
              return (
                <MessageUserBox key={user.user_id} user={user} />
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
            No Message!
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

export default Message

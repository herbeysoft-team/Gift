import React, {useEffect} from "react";
import { Box } from "@mui/material";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import HomeNavTabs from "../components/HomeNavTabs";
import {  useDispatch } from "react-redux";
import { hasUnreadNotification } from "../context/features/notificationSlice";
import { hasNoUnreadMessages } from "../context/features/messageSlice";


const Home = () => {
   const dispatch = useDispatch();

   useEffect(() => {
    dispatch(hasUnreadNotification());
    dispatch(hasNoUnreadMessages());
  }, [dispatch]);
  
  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
      <MobileNavBar logo={Logo} title={"Home"} />  

      {/* Other Sections start here */}

      <HomeNavTabs />
    </Box>
  );
};

export default Home;

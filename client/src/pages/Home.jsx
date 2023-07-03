import React from "react";
import { Box } from "@mui/material";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import HomeNavTabs from "../components/HomeNavTabs";
// import { useDispatch, useSelector } from "react-redux";
// import { getPosts } from "../context/features/postSlice";


const Home = () => {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => ({ ...state.auth }));
  
  // useEffect(() => {
  //   dispatch(getPosts({id:user?.result?.id, page:1 }));
  // }, [dispatch, user?.result?.id]);
  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
      <MobileNavBar logo={Logo} title={"Home"} />  

      {/* Other Sections start here */}

      <HomeNavTabs />
    </Box>
  );
};

export default Home;

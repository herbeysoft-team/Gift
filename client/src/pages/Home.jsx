import React, {useEffect} from "react";
import { Box } from "@mui/material";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import HomeNavTabs from "../components/HomeNavTabs";
import { useDispatch } from "react-redux";
import { getPosts } from "../context/features/postSlice";


const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Box flex={3}>
      <MobileNavBar logo={Logo} title={"Home"} />

      {/* Other Sections start here */}

      <HomeNavTabs />
    </Box>
  );
};

export default Home;

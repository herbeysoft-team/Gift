import React from 'react';
import {Box,  Stack, } from "@mui/material";
import Navbar from './Navbar';
import Rightbar from './Rightbar';
import LeftBar from './Leftbar';
import { Outlet } from 'react-router-dom';
import ButtomNav from './ButtomNav';


const Layout = () => {
  return (
    <Box>
      <Navbar/>
      <Stack direction="row" justifyContent="space-between" >
        <Rightbar/>
        <Outlet/>
        <LeftBar/>
      </Stack>
      <ButtomNav/>
    </Box>
  )
}

export default Layout

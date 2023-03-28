import React from 'react';
import {Box,  Stack, } from "@mui/material";
import Navbar from './Navbar';
import Rightbar from './Rightbar';
import LeftBar from './Leftbar';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <Box>
      <Navbar/>
      <Stack direction="row" spacing={2} justifyContent="space-between" >
        <Rightbar/>
        <Outlet/>
        <LeftBar/>
      </Stack>
    </Box>
  )
}

export default Layout

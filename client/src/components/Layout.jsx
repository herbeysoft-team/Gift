import React from 'react';
import {Box,  Grid,  Stack, } from "@mui/material";
import Navbar from './Navbar';
import Rightbar from './Rightbar';
import LeftBar from './Leftbar';
import { Outlet } from 'react-router-dom';
import ButtomNav from './ButtomNav';


const Layout = () => {
  return (
    // <Box>
    //   <Navbar/>
    //   <Stack direction="row" justifyContent="space-between" >
    //     <Rightbar/>
    //     <Outlet/>
    //     <LeftBar/>
    //   </Stack>
    //   <ButtomNav/>
    // </Box>

    <Grid container direction="column">
      <Grid item >
        <Navbar />
      </Grid>
      <Grid item container>
        <Grid item xs={false}  md={3} lg={2}>
        <Rightbar />
        </Grid>
        <Grid item xs={12}  md={5} lg={7}>
          <Outlet />
        </Grid>
        <Grid item xs={false}  md={4} lg={3}>
        <LeftBar />
          
        </Grid>
      </Grid>
      <Grid item>
        <ButtomNav />
      </Grid>
    </Grid>
  )
}

export default Layout

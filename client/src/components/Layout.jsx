import React from "react";
import { Grid } from "@mui/material";
import Navbar from "./Navbar";
import Rightbar from "./Rightbar";
import LeftBar from "./Leftbar";
import { Outlet } from "react-router-dom";
import ButtomNav from "./ButtomNav";

const Layout = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Navbar />
      </Grid>
      <Grid item container>
        <Grid item xs={false} md={3} lg={2}>
          <Rightbar />
        </Grid>
        <Grid item xs={12} md={5} lg={7} sx={{px:{xs:"none", md:"2rem", lg:"4rem"}}}>
          <Outlet />
        </Grid>
        <Grid item xs={false} md={4} lg={3}>
          <LeftBar />
        </Grid>
      </Grid>
      <Grid item>
        <ButtomNav />
      </Grid>
    </Grid>
  );
};

export default Layout;

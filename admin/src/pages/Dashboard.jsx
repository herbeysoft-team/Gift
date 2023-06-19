import styled from "@emotion/styled";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardItem from "../component/CardItem";
import PeopleIcon from '@mui/icons-material/People';
import PagesIcon from '@mui/icons-material/Pages';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import RedoIcon from '@mui/icons-material/Redo';
import IosShareIcon from '@mui/icons-material/IosShare';
// import { getUsersCount } from "../../Context/features/userSlice";
// import { getMemosCount } from "../../Context/features/memoSlice";
import { useSelector, useDispatch } from "react-redux";
// import { Backdrop } from "@mui/material";
// import loaderImg from "../../assets/loader.gif";
import toast from "react-hot-toast";
import PieMemo from "../component/PieMemo";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

const Wrapper = styled(Box)(({ theme }) => ({
  height: "100vh",
  //padding: theme.spacing(1),
  top: 0,
  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.spacing(2),
  },
}));

const Dashboard = () => {
  // const { userscount, loading, error } = useSelector((state) => ({
  //   ...state.user,
  // }));
  // const { memoscount } = useSelector((state) => ({
  //   ...state.memo,
  // }));

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   dispatch(getUsersCount());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getMemosCount());
  // }, [dispatch]);

  // useEffect(() => {
  //   loading && setIsLoading(loading);
  // }, [loading]);

  // useEffect(() => {
  //   error && toast.error(error);
  // }, [error]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyItems: "center",
      }}
    >
      {/* {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <img src={loaderImg} alt="Loading..." />
        </Backdrop>
      )} */}
      <Typography
        component="h4"
        color="secondary.dark"
        variant="h4"
        textAlign="center"
        sx={{ fontWeight: "bold", fontFamily:"Poppins" }}
      >
        Dashboard
      </Typography>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4} className="grid">
            <Item>
              <CardItem
                name="USER"
                icon={<PeopleIcon />}
                number={"34"}
                bgavatar= "#642c8e"
                numberColor="#642c8e"
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4} className="grid">
            <Item>
              <CardItem
                name="POST"
                icon={<PagesIcon />}
                number={"56"}
                bgavatar="#642c8e"
                numberColor="#642c8e"
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4} className="grid">
            <Item>
              <CardItem
                name="TROWBOX"
                icon={<MoveToInboxIcon />}
                number={"34"}
                bgavatar="#642c8e"
                numberColor="#642c8e"
              />
            </Item>
          </Grid>
        </Grid>
        <Box mt={2}></Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} className="grid">
            <Item>
              <CardItem
                name="GIFT"
                icon={<CardGiftcardIcon />}
                number={"45"}
                bgavatar="#642c8e"
                numberColor="#642c8e"
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4} className="grid">
            <Item>
              <CardItem
                name="RETROW"
                icon={<RedoIcon />}
                number={"34"}
                bgavatar="#642c8e"
                numberColor="#642c8e"
              />
            </Item>
          </Grid>
          <Grid item xs={12} md={4} className="grid">
            <Item>
              <CardItem
                name="SHARE"
                icon={<IosShareIcon />}
                number={"45"}
                bgavatar="#642c8e"
                numberColor="#642c8e"
              />
            </Item>
          </Grid>
        </Grid>
        <Box mt={2}></Box>
        
        <Paper elevation={2} sx={{ p: 2, gridColumn: "1/3" }} className="grid">
          <PieMemo />
        </Paper>
      </Wrapper>
    </Box>
  )
}

export default Dashboard

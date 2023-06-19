import React from "react";
import FeedIcon from "@mui/icons-material/Feed";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../context/features/authSlice";

const RightNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 44,
    paddingRight: 44,
  },
  "& .MuiListItemText-primary": {
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Poppins",
    minWidth: 0,
    marginRight: 16,
    color: "#ba68c8",
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
    color: "#ba68c8",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 30,
  },
});

const Rightbar = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout())
    navigate("/");
  };
  return (
    <Box
      flex={1}
      p={2}
      height="100vh"
    
      sx={{ display: { xs: "none", sm: "none", md:"none", lg:"block"} }}
    >
      <Box position="fixed">
        <RightNav>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component={Link}  to="/home">
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Event" />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component={Link}  to="/home/trowbox">
              <ListItemIcon>
                <CardGiftcardIcon />
              </ListItemIcon>
              <ListItemText primary="TrowBox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component={Link}  to="/home/shop">
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText primary="Gift Shop" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component={Link}  to={`/home/notification`}>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component={Link} to={`/home/message`}>
              <ListItemIcon>
                <MessageIcon />
              </ListItemIcon>
              <ListItemText primary="Message" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component={Link}  to={`/home/profile/${user?.result?.id}`}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </RightNav>
        <Divider />
        <RightNav>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component={Link}  to="/" onClick={()=> handleLogout()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="LogOut" />
            </ListItemButton>
          </ListItem>
        </RightNav>
      </Box>
    </Box>
  );
};

export default Rightbar;

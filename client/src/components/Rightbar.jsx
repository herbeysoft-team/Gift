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

const RightNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 44,
    paddingRight: 44,
  },
  "& .MuiListItemText-root": {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Poppins",
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
  return (
    <Box
      flex={1}
      p={2}
      height="100vh"
    
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed">
        <RightNav>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Event" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <CardGiftcardIcon />
              </ListItemIcon>
              <ListItemText primary="TrowBox" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <StorefrontIcon />
              </ListItemIcon>
              <ListItemText primary="Gift Shop" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="Notification" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <MessageIcon />
              </ListItemIcon>
              <ListItemText primary="Message" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ paddingBottom: "5px" }}>
            <ListItemButton component="a" href="#simple-list">
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
            <ListItemButton component="a" href="#home">
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

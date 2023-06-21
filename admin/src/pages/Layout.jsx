import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet } from "react-router-dom";
import {  Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import OutboxIcon from '@mui/icons-material/Outbox';
import CategoryIcon from "@mui/icons-material/Category";
import Logo from "../assets/logo.png";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
const drawerWidth = 240;

const links = [
  {
    id: 1,
    name: "Dashboard",
    path: "/home",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    name: "User",
    path: "/home/user",
    icon: <GroupIcon />,
  },
  {
    id: 3,
    name: "Trowbox",
    path: "/home/trowbox",
    icon: <OutboxIcon />,
  },
  {
    id: 4,
    name: "Category",
    path: "/a_category",
    icon: <CategoryIcon />,
  },
];

const links2 = [
  {
    id: 5,
    name: "Memo",
    path: "/a_memo",
    icon: <TextSnippetIcon />,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} elevation="1">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 3,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="heading"
                fontWeight="bold"
                fontFamily="Poppins"
                noWrap
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                 
                }}
              >
                 <img src={Logo} alt="logo" />
                TrowBox
              </Typography>
              
            </Box>
          </Box>
          <Icons>

            <IconButton
              aria-label="options"
              color="primary"
              onClick={(e) => setOpenOption(true)}
              sx={{width:64, height:64}}
            >
              <MoreVertIcon />
            </IconButton>
          </Icons>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={openOption}
            onClose={(e) => setOpenOption(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {/* <MenuItem onClick={() => navigate(`/a_edit/${userId}`)}>
              Profile
            </MenuItem> */}
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon color="primary" />
            ) : (
              <ChevronLeftIcon  color="primary"/>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{paddingBottom:2}}/>
        <List>
          {links.map((linkInfo, index) => (
            <ListItem
              key={linkInfo.id}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                component={Link}
                to={linkInfo.path}
                selected={selectedIndex === linkInfo.id}
                onClick={(event) => handleListItemClick(event, linkInfo.id)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color:"#7b1fa2"
                  }}
                >
                  {linkInfo.icon}
                </ListItemIcon>
                <ListItemText
                  primary={linkInfo.name}
                  primaryTypographyProps={{
                    style: {
                      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                    },
                  }}
                  sx={{ opacity: open ? 1 : 0 , fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif"'}}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {links2.map((linkInfo, index) => (
            <ListItem
              key={linkInfo.id}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                component={Link}
                to={linkInfo.path}
                selected={selectedIndex === linkInfo.id}
                onClick={(event) => handleListItemClick(event, linkInfo.id)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color:"#7b1fa2"
                  }}
                >
                  {linkInfo.icon}
                </ListItemIcon>
                <ListItemText
                  primary={linkInfo.name}
                  primaryTypographyProps={{
                    style: {
                      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
                    },
                  }}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "FCFCFC", height: "auto" }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

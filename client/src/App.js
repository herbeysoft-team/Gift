import React, {useEffect} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "./context/features/authSlice";

/**Import the components */
import Login from "./components/Login";
import Register from "./components/Register";
import Verify from "./components/Verify";
import Reset from "./components/Reset";
import ChangePassowrd from "./components/ChangePassowrd";
import PageNotFound from "./components/PageNotFound";
import Layout from "./components/Layout";
import MobileSearch from "./components/MobileSearch";

/**Import the pages */
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import Trowbox from "./pages/Trowbox";
import PostDetails from "./pages/PostDetails";
import Notification from "./pages/Notification";
import Trow from "./pages/Trow";
import UpdateProfile from "./pages/UpdateProfile";
import ChangeProfilePic from "./pages/ChangeProfilePic";
import AddItem from "./pages/AddItem";
import TrowBoxProcess from "./pages/TrowBoxProcess";
import PickShop from "./pages/PickShop";
import CreateEvent from "./pages/CreateEvent";

/**root routes */
const router = createBrowserRouter([
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home/profile/:id",
        element: <Profile />,
      },
      {
        path: "/home/updateprofile/:id",
        element: <UpdateProfile />,
      },
      {
        path: "/home/changeprofilepic",
        element: <ChangeProfilePic />,
      },
      {
        path: "/home/shop",
        element: <Shop />,
      },
      {
        path: "/home/pickshop/:id",
        element: <PickShop />,
      },
      {
        path: "/home/shop/add",
        element: <AddItem />,
      },
      {
        path: "/home/trowbox",
        element: <Trowbox />,
      },
      {
        path: "/home/createevent",
        element: <CreateEvent />,
      },
      {
        path: "/home/postdetails/:id",
        element: <PostDetails />,
      },
      {
        path: "/home/trowboxprocess/:id",
        element: <TrowBoxProcess />,
      },
     
      {
        path: "/home/notification",
        element: <Notification />,
      },
      {
        path: "/home/trow",
        element: <Trow/>,
      },
      {
        path: "/home/search",
        element: <MobileSearch/>,
      },
    ],
  },
  {
    path: "/",
    element: <Login></Login>,
  },

  {
    path: "/reset",
    element: <Reset></Reset>,
  },
  {
    path: "/verify",
    element: <Verify></Verify>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/changePassword",
    element: <ChangePassowrd></ChangePassowrd>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**create a theme */
  const theme = createTheme({
    spacing: 10,
    palette: {
      primary: {
        main: "#642c8e",
        light: "#ba68c8",
        dark: "#7b1fa2",
      },
      secondary: {
        main: "#d676af",
        light: "f0b2d7",
        dark: "#c1699d",
      },
    },
    typography: {
      heading: {
        fontSize: 50,
        color: "#642c8e",
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            // Map the new variant to render a <h1> by default
            heading: "h3",
          },
        },
      },
      MuiListItemButton: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiCardHeader: {
        title: {
          fontFamily: "Poppins",
          fontSize: "40px",
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Toaster ToastPosition="top-center" />
        <RouterProvider router={router}></RouterProvider>
      </main>
    </ThemeProvider>
  );
}

export default App;

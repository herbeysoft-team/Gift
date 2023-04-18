import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

/**Import the components */
import Login from "./components/Login";
import Register from "./components/Register";
import Verify from "./components/Verify";
import Reset from "./components/Reset";
import ChangePassowrd from "./components/ChangePassowrd";
import PageNotFound from "./components/PageNotFound";
import Layout from "./components/Layout";

/**Import the pages */
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import Trowbox from "./pages/Trowbox";
import PostDetails from "./pages/PostDetails";

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
        path: "/home/shop",
        element: <Shop />,
      },
      {
        path: "/home/trowbox",
        element: <Trowbox />,
      },
      {
        path: "/home/postdetails/:id",
        element: <PostDetails />,
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


import React, {useEffect} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import { setUser } from "./context/features/authSlice";
import User from "./pages/User";
import Trowbox from './pages/Trowbox';



/**root routes */
const router = createBrowserRouter([
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Dashboard />,
      },
      {
        path: "/home/user",
        element: <User/>,
      },
      {
        path: "/home/trowbox",
        element: <Trowbox/>,
      },
    
    ],
  },
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "*",
    element: <Login/>,
  },
]);

function App() {

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("trowadmin"));
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
            heading: "h4",
            
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

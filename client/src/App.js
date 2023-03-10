import React from "react"
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

/**Import the components */
import Login from "./components/Login";
import Register from "./components/Register";
import Verify from "./components/Verify";
import Reset from "./components/Reset";
import ChangePassowrd from "./components/ChangePassowrd";
import PageNotFound from "./components/PageNotFound";


/**root routes */
const router = createBrowserRouter(
  [
    {
      path : '/',
      element : <Login></Login>
    },
    {
      path : '/home',
      element : <><h1>HomePage</h1></>
    },
    {
      path : '/reset',
      element : <Reset></Reset>
    },
    {
      path : '/verify',
      element : <Verify></Verify>
    },
    {
      path : '/register',
      element : <Register></Register>
    },
    {
      path : '/changePassword',
      element : <ChangePassowrd></ChangePassowrd>
    },
    {
      path : '*',
      element : <PageNotFound></PageNotFound>
    },

  ]
)

function App() {
  /**create a theme */
  const theme = createTheme({
    spacing: 10,
    palette: {
      primary:{
        main: "#642c8e",
        light: "#ba68c8",
        dark: "#7b1fa2",
      },
      secondary:{
        main: "#d676af",
        light: "f0b2d7",
        dark: "#c1699d",
      }
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
            heading: 'h3',
          },
        },
      },
    },
})
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <main>
        <Toaster ToastPosition='top-center'/>
        <RouterProvider router={router}>

        </RouterProvider>
    </main>
    </ThemeProvider>
  );
}

export default App;

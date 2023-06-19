/* eslint-disable eqeqeq */
import toast from 'react-hot-toast'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../context/features/authSlice";

const initialState = {
  username: "",
  password: "",
};

/**FOOTER */
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      <Link  style={{textDecoration:"none"}} href="#">
        TROWBOX
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
       All Right Reserved
    </Typography>
  );
}


const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { username, password } = formValue;
//   const { loading, error } = useSelector((state) => ({ ...state.auth }));
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
  

//   useEffect(() => {
//     loading && setIsLoading(loading);
//   }, [loading]);

//   useEffect(() => {
//     error && toast.error(error.message);
//   }, [error]);

 

  /**Handle Submit Function */
  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^[A-Za-z0-9]{6,}$/;

    if (!(username && password)) {
      toast.error("Username & Password Required...!");
    } else if(!username){
      toast.error("PUsername Required...!");
    }else if(!password){
      toast.error("Password Required...!");
    }else if(username.includes(" ")){
      toast.error("Incorrect Username...!");
    }else if(password.includes(" ")){
      toast.error("Wrong Password...!");
    }else if(password.length < 6){
      toast.error("Password must be more than 6 charateers long");
    }
    else if(!passwordRegex.test(password)){
      toast.error("Password must be Alphanumeric")
    }else{
    // dispatch(login({ formValue, navigate, toast }));
    }
    }

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    
  };

  return (
    <Container maxWidth="xs" component="div">
      <Box
        marginTop="5rem"
        marginBottom="1rem"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="heading"
          fontFamily="Poppins"
          alignItems="center"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <img src={Logo} alt="logo" />
          TrowBox
        </Typography>
      </Box>
      <Box
        component={Paper}
        elevation={2}
        sx={{
          marginTop: 2,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingX: 4,
          paddingY: 5,
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            onChange={onInputChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onInputChange}
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, p: 1.5, borderRadius: 2 }}
          >
            Sign In
          </Button>
        </Box>
        
      </Box>
      <Copyright sx={{ mt: 1 }} />
    </Container>
  );
};

export default Login;

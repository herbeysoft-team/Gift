import toast from 'react-hot-toast'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  phoneno: "",
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
  const { phoneno } = formValue;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (!(phoneno)) {
      toast.error("Phone no & Password Required...!");
    } else if(!phoneno){
      toast.error("Phone no Required...!");
    }else if(phoneno.includes(" ")){
      toast.error("Wrong Phone Number...!");
    }else if(!phoneRegex.test(phoneno)){
      toast.error("Phone Number must be international format +23480XXX")
    }
    else{
      console.log({phoneno})
      navigate("/");
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
            id="phoneno"
            label="Phone Number"
            name="phoneno"
            onChange={onInputChange}
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, p: 1.5, borderRadius: 2 }}
          >
            RESET PASSWORD
          </Button>
        </Box>
        <Typography
          variant="caption"
          color="#d676af"
          alignItems="center"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
            fontSize: "0.7rem",
          }}
        >
          Don't have an account{" "}
          <span>
            <Link style={{ fontWeight: "bold", fontSize: "0.9rem", textDecoration:"none" }} to="/register">Register Here</Link>
          </span>
        </Typography>
      </Box>
      <Copyright sx={{ mt: 1 }} />
    </Container>
  );
};

export default Login;

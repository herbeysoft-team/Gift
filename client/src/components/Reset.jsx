import toast from 'react-hot-toast'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordOTP } from "../context/features/authSlice";


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


const Reset = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { phoneno } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => ({
    ...state.auth,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (!(phoneno)) {
      toast.error("Phone no Required...!");
    } else if(phoneno.includes(" ")){
      toast.error("Wrong Phone Number...!");
    }else if(!phoneRegex.test(phoneno)){
      toast.error("Phone Number must be international format +23480XXX")
    }
    else{
      //GET NEW OTP TO RESET YOUR PASSWORD
      dispatch(resetPasswordOTP({ formValue:{
        phone_no:phoneno
      }, navigate, toast }));
      }
    }

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    
  };


  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);


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
         {loading && (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="30px" /* Adjust the height as needed */
            >
              <CircularProgress size={24} color="secondary" />
            </Box>
          </>
        )}
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
        <Typography
          variant="caption"
          color="#d676af"
          alignItems="center"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1,
            fontSize: "0.7rem",
          }}
        >
          <Link to="/changePassword" style={{ fontSize: "0.7rem", textDecoration:"none" }}> Change Password Here</Link>
          
        </Typography>
      </Box>
      <Copyright sx={{ mt: 1 }} />
    </Container>
  );
};

export default Reset;

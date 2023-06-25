import toast from 'react-hot-toast'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { resendOTP, verify } from "../context/features/authSlice";

const initialState = {
  otp: "",
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


const Verify = () => {
  const { user} = useSelector((state) => ({
    ...state.auth,
  }));
  const [formValue, setFormValue] = useState(initialState);
  const { otp } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //GET THE CURRENT USER DATA
  const currentUser = useMemo(()=> user, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!( otp)) {
      toast.error("Phone no & otp Required...!");
    }else if(otp.includes(" ")){
      toast.error("Wrong OTP...!");
    }else if(otp.length < 4){
      toast.error("oTP number should be 4 digits");
    }
    else{
    //VERIFY HERE
    dispatch(verify({ formValue:{
      phone_no:currentUser?.result?.phone_no,
      otp,
    }, navigate, toast }));
    }
    }
  
  //HANDLE RE-SENDING OTP
  const handleSendOTP = (e) => {
      e.preventDefault();
      dispatch(resendOTP({ formValue:{
        phone_no:currentUser?.result?.phone_no
      }, toast }));

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
        <Typography variant="caption"
          color="#d676af"
          alignItems="center"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "0.9rem",
            fontWeight: "bold",
            textAlign:"center"
          }}>
              OTP has been sent to {currentUser?.result?.phone_no}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="otp"
            label="OTP"
            type="number"
            id="otp"
            onChange={onInputChange}
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, p: 1.5, borderRadius: 2 }}
          >
            Verify
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
          Already Verified{" "}
          <span>
            <Link style={{ fontWeight: "bold", fontSize: "0.9rem", textDecoration:"none" }} to="/">Login Here</Link>
          </span>
        </Typography>
        <Button
          variant="outline"
          
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.7rem",
            fontStyle: "bold",
            color: "#d676af",
          }}
          onClick={handleSendOTP}
        >
           Resend OTP
          
        </Button>
      </Box>
      <Copyright sx={{ mt: 1 }} />
    </Container>
  );
};

export default Verify;

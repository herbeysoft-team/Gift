import toast from 'react-hot-toast'
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { register } from "../context/features/authSlice";

const initialState = {
  fullname:"",
  username:"",
  city:"",
  phoneno: "",
  gender:"",
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


const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { phoneno, password, fullname, city, gender, username } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const passwordRegex = /^[A-Za-z0-9]{6,}$/;

    if (!(phoneno && password && fullname && city && gender && username)) {
      toast.error("All inputs are Required...!");
    } else if(!phoneno){
      toast.error("Phone no Required...!");
    }else if(!password){
      toast.error("Password Required...!");
    }else if(phoneno.includes(" ")){
      toast.error("Wrong Phone Number...!");
    }else if(password.includes(" ")){
      toast.error("Wrong Password...!");
    }else if(password.length < 6){
      toast.error("Password must be more than 6 charateers long");
    }else if(!phoneRegex.test(phoneno)){
      toast.error("Phone Number must be international format +23480XXX")
    }
    else if(!passwordRegex.test(password)){
      toast.error("Password must be Alphanumeric")
    }else{
      //REGISTER YOUR ACCOUNT
      dispatch(register({formValue:{
        fullname,
        username,
        phone_no : phoneno,
        city,
        gender,
        password
      }, navigate, toast}));
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
          marginTop: 1,
          marginBottom: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingX: 4,
          paddingY: 2,
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="dense"
            required
            fullWidth
            id="fullname"
            label="FirstName LastName"
            name="fullname"
            onChange={onInputChange}
            autoFocus
          />
          <TextField
            margin="dense"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={onInputChange}
            autoFocus
          />
          <TextField
            margin="dense"
            required
            fullWidth
            id="phoneno"
            label="Phone Number (+23480XXXX)"
            name="phoneno"
            onChange={onInputChange}
            autoFocus
          />
          <TextField
            margin="dense"
            required
            fullWidth
            id="city"
            label="City, Country"
            name="city"
            onChange={onInputChange}
            autoFocus
          />
          <TextField
            required
            fullWidth
            id="gender"
            select
            value={gender}
            name='gender'
            label="Gender"
            margin='dense'
            onChange={onInputChange}
            autoFocus
            >

              <MenuItem  value="0">
                Select Gender
              </MenuItem>
              <MenuItem value="Male">
                Male
              </MenuItem>
              <MenuItem value="Female">
                Female
              </MenuItem>

            </TextField>
          <TextField
            margin="dense"
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
            REGISTER
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
          Already Register?{" "}
          <span>
            <Link style={{ fontWeight: "bold", fontSize: "0.9rem", textDecoration:"none" }} to="/">Login Now</Link>
          </span>
        </Typography>
      </Box>
      <Copyright sx={{ mt: 1 }} />
    </Container>
  );
};

export default Register;

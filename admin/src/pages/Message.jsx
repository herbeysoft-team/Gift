import styled from '@emotion/styled';
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'
import { sendtextmessagetouser } from "../context/features/messageSlice";
import toast from "react-hot-toast"
import { useDispatch } from 'react-redux';


const CustomButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  width:"100%",
  backgroundColor: theme.palette.primary.main,
  paddingRight: 20,
  paddingLeft: 20,
  paddingY: 2,
  fontSize: 14,
  fontFamily: "Poppins",
  justifyContent: "center",
  borderRadius: 20,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Message = () => {
  const dispatch = useDispatch()
  const [phone_no, setPhone_no] = useState("");
  const [message, setMessage] = useState("");

  const onInputChange = (e) => {
    setPhone_no(e.target.value);
  };

  const onInputChangeC = (e) => {
    setMessage(e.target.value);
  };

  const onSubmitMessage= async (e) => {
    e.preventDefault();
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    if (!(phone_no && message)) {
      toast.error("Phone no & message...!");
    } else if(!phone_no){
      toast.error("Phone no Required...!");
    }else if(!message){
      toast.error("Message Required...!");
    }else if(phone_no.includes(" ")){
      toast.error("Wrong Phone Number...!");
    }else if(!phoneRegex.test(phone_no)){
      toast.error("Phone Number must be international format +23480XXX")
    }else{
     dispatch(sendtextmessagetouser({formValue:{
      phone_no,
      message
     }, toast}));
     setMessage("")
     setPhone_no("")
    }
    }
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyItems: "center",
      }}
    >
      <Typography
        component="h4"
        color="secondary.dark"
        variant="h4"
        textAlign="center"
        sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
      >
        Send a SMS
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3} className="grid">
          
        </Grid>
        <Grid item xs={12} md={6} className="grid">
          <TextField
            margin="normal"
            fullWidth
            size="normal"
            id="phone_no"
            label="Phone Number"
            name="phone_no"
            value={phone_no || ""}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} md={3} className="grid">
          
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3} className="grid">
          
        </Grid>
        <Grid item xs={12} md={6} className="grid">
          <TextField
            multiline
            rows={6}
            margin="normal"
            fullWidth
            size="normal"
            id="message"
            label="Message"
            name="message"
            value={message || ""}
            onChange={onInputChangeC}
          />
        </Grid>
        <Grid item xs={12} md={3} className="grid">
          
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={3} className="grid">
          
        </Grid>
        <Grid item xs={12} md={6} className="grid">
        <CustomButton onClick={onSubmitMessage}>Send SMS</CustomButton>
        </Grid>
        <Grid item xs={12} md={3} className="grid">
          
        </Grid>
      </Grid>
      </Box>
  )
}

export default Message

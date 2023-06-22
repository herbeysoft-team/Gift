import styled from '@emotion/styled';
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'


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
  const [phone_no, setPhone_no] = useState("");
  const [message, setMessage] = useState("");


  const onSubmitMessage= async (e) => {
    e.preventDefault();
   
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

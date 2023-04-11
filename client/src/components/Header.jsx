import { Box,Typography } from '@mui/material'
import React from 'react'
import Trowbox from "../assets/trowbox.png";

const Header = () => {
  return (
    <Box
        p={3}
        sx={{
          elevation: 2,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
          gap: 1,
          mx:1,
          backgroundColor: "#642c8e",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          WebkitBorderBottomLeftRadius: 20,
          WebkitBorderBottomRightRadius: 20,
        }}
      >
        
          <img src={Trowbox} alt="logo" width={70} height={70} />
      
        <Typography variant="h4" color={'white'} sx={{fontFamily:"Poppins", fontWeight:"medium"}}>My TrowBox</Typography>
      </Box>
  )
}

export default Header

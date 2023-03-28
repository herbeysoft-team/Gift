import { AppBar, Toolbar, styled } from '@mui/material'
import React from 'react'


const StyledToolBar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor:"#fff",
    elevation:0,
    

});


const Navbar = () => {
  return (
    <AppBar position='sticky'> 
        <StyledToolBar>

        </StyledToolBar>
      
    </AppBar>
  )
}

export default Navbar

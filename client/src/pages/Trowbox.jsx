import { Box } from '@mui/material'
import React from 'react'
import MobileNavBar from '../components/MobileNavBar'
import Logo from "../assets/logo.png";


const Trowbox = () => {
  return (
    <Box flex={3}>
        <MobileNavBar logo={Logo} title={"Trowbox"}/>
    </Box>
  )
}

export default Trowbox

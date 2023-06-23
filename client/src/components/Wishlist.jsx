import { Box, Typography} from '@mui/material'
import React from 'react'
import WishCards from './WishCards'

const Wishlist = ({user_id, checkWishlist, isMutual}) => {
  return (
    <Box>
      {checkWishlist ? 
        <WishCards user_id = {user_id} isMutual = {isMutual}/>
        : <Typography
        variant="h6"
        color="primary"
        fontFamily="Poppins"
        fontWeight="medium"
        textAlign="center"
        marginTop="5"
      >
        You are not Authorised to check user's wishlist
      </Typography>
}
    </Box>
  )
}

export default Wishlist

import { Box} from '@mui/material'
import React from 'react'
import WishCards from './WishCards'

const Wishlist = ({user_id}) => {
  return (
    <Box>
        <WishCards user_id = {user_id}/>
    </Box>
  )
}

export default Wishlist

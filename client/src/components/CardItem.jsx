import { Box, CardContent, CardMedia, Checkbox, IconButton, Typography } from '@mui/material'
import React from 'react'
import {
    Favorite,
    FavoriteBorder,

  } from "@mui/icons-material";

const CardItem = () => {
  return (
    <Box sx={{boxShadow: "2", }}>
    
        <CardMedia
          component="img"
          height="10%"
          fit="cover"
          image="https://cdn.shopify.com/s/files/1/0011/0162/7439/products/iPhone14ProMax_DeepPurple_0c05c6a6-f4f9-4945-a45c-41b4b70edcac_5000x.png?v=1668772224"
          alt="Item"
        />

      <CardContent sx={{display:"flex", justifyContent:"space-between", flexDirection:"row", alignItems:"center"}}>
          <Typography variant="body" sx={{fontSize:"12px"}}>
            iPhone 14
          </Typography>
          <IconButton
          aria-label="wishlist"
          size="large"
        >
          <Checkbox
            icon={<FavoriteBorder sx={{ color: "purple", fontSize: 24 }} />}
            checkedIcon={<Favorite sx={{ color: "purple", fontSize: 24 }} />}
          />
        </IconButton>
        </CardContent>
      
    </Box>
  )
}

export default CardItem

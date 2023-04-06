import { Box, Grid } from '@mui/material'
import React from 'react'
import CardItem from './CardItem'

const CardItems = () => {
  return (
    <Box sx={{mx:1, mt:3, mb: 5, justifyContent: "center", alignItems: "center" }}>
        <Grid container rowSpacing={1} columnSpacing={1}>

            <Grid item xs={6} sm={6} md={6} lg={4}>
                <CardItem/>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
                <CardItem/>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
                <CardItem/>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
                <CardItem/>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
                <CardItem/>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
                <CardItem/>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
                <CardItem/>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={4}>
                <CardItem/>
            </Grid>
        </Grid>
      
    </Box>
  )
}

export default CardItems

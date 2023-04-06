import { Box } from '@mui/material'
import React from 'react'
import MobileNavBar from '../components/MobileNavBar'
import Store from "../assets/store.png";
import ShopSearch from '../components/ShopSearch';
import GiftCategoryTabs from '../components/GiftCategoryTabs';
import CardItems from '../components/CardItems';

const Shop = () => {
  return (
    <Box flex={3}>
        {/* header */}
        <MobileNavBar logo={Store} title={"Gift Shop"} />
        {/* Search item */}
        <ShopSearch/>
        {/* Gift Tab Categories  */}
        <GiftCategoryTabs/>
        {/* display the items    */}
        <CardItems/>
        

    </Box>
  )
}

export default Shop

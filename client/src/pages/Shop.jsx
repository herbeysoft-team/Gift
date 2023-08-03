import { Box, Fab, Tooltip } from '@mui/material'
import React, {useEffect} from 'react'
import MobileNavBar from '../components/MobileNavBar'
import Store from "../assets/store.png";
import ShopSearch from '../components/ShopSearch';
import GiftCategoryTabs from '../components/GiftCategoryTabs';
import CardItems from '../components/CardItems';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate} from "react-router-dom";
import { getCategories, getSubcategories} from "../context/features/itemSlice";
import { useSelector, useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item_categories } = useSelector((state) => ({
    ...state.item,
  }));
  useEffect(() => {
    dispatch(getSubcategories());
    dispatch(getCategories());
  }, [dispatch]);


  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
        {/* header */}
        <MobileNavBar logo={Store} title={"Gift Shop"} />
        {/* Search item */}
        <ShopSearch/>
        {/* Gift Tab Categories  */}
        <GiftCategoryTabs categories={item_categories}/>
        {/* display the items    */}
        <CardItems wishlist={true}/>
        <Tooltip
                onClick={(e) => navigate('/home/shop/add')}
                title="Add Item"
                sx={{
                    position: "fixed",
                    bottom: 30,
                    left: { xs: "calc(50% - 25px)", md: 30 },
                }}
            >
                <Fab color="primary" aria-label="Add Item">
                    <AddIcon />
                </Fab>
            </Tooltip>
            
    </Box>
  )
}

export default Shop

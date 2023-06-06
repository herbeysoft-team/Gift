import { Box} from '@mui/material'
import React, {useEffect} from 'react'
import MobileNavBar from '../components/MobileNavBar'
import Store from "../assets/store.png";
import ShopSearch from '../components/ShopSearch';
import GiftCategoryTabs from '../components/GiftCategoryTabs';
import PickShopCards from '../components/PickShopCards';
import { useNavigate, useLocation} from "react-router-dom";
import { getSubcategories} from "../context/features/itemSlice";
import { useSelector, useDispatch } from "react-redux";

const PickShop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const { item_subcategories } = useSelector((state) => ({
    ...state.item,
  }));
  useEffect(() => {
    dispatch(getSubcategories());
    
  }, [dispatch]);
  
  return (
    <Box flex={3}>
        {/* header */}
        <MobileNavBar logo={Store} title={"Gift Shop"} />
        {/* Search item */}
        <ShopSearch/>
        {/* Gift Tab Categories  */}
        <GiftCategoryTabs categories={item_subcategories}/>
        {/* display the items    */}
        <PickShopCards id={id} navigate={navigate}/>

    </Box>
  )
}

export default PickShop
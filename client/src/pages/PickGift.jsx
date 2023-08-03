import { Box} from '@mui/material'
import React, {useEffect} from 'react'
import MobileNavBar from '../components/MobileNavBar'
import Store from "../assets/store.png";
import ShopSearch from '../components/ShopSearch';
import GiftCategoryTabs from '../components/GiftCategoryTabs';
import { useNavigate, useLocation} from "react-router-dom";
import { getSubcategories, getCategories} from "../context/features/itemSlice";
import { useSelector, useDispatch } from "react-redux";
import PickGiftCards from '../components/PickGiftCards';

const PickGift = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  const {item_categories } = useSelector((state) => ({
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
        <PickGiftCards id={id} navigate={navigate} link={true}/>

    </Box>
  )
}

export default PickGift

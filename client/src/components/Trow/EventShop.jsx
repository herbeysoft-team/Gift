import { Box } from "@mui/material";
import React, {useEffect} from "react";
import ShopSearch from "../ShopSearch";
import GiftCategoryTabs from "../GiftCategoryTabs";
import CardItems from "../CardItems";
import Gift from "../../assets/gift.png";
import Hero from "./Hero";
import { getSubcategories} from "../../context/features/itemSlice";
import { useSelector, useDispatch } from "react-redux";


const EventShop = () => {
  const dispatch = useDispatch();
  const { item_subcategories } = useSelector((state) => ({
    ...state.item,
  }));
  useEffect(() => {
    dispatch(getSubcategories());
  }, [dispatch]);
  return (
    <Box
      sx={{ mx: 0.5, mb: 2, justifyContent: "center", alignItems: "center" }}
    >
        {/* header or hero section */}
        <Hero logo={Gift} title={"Recommend Gift"} />
        {/* Search item */}
        <ShopSearch />
        {/* Gift Tab Categories  */}
        <GiftCategoryTabs categories={item_subcategories} />
         {/* display the items    */}
         <CardItems/>

    </Box>
  );
};

export default EventShop;

import { Box } from "@mui/material";
import React from "react";
import ShopSearch from "../ShopSearch";
import GiftCategoryTabs from "../GiftCategoryTabs";
import CardItems from "../CardItems";
import Gift from "../../assets/gift.png";
import Hero from "./Hero";

const EventShop = () => {
  return (
    <Box
      sx={{ mx: 0.5, mb: 2, justifyContent: "center", alignItems: "center" }}
    >
        {/* header or hero section */}
        <Hero logo={Gift} title={"Recommend Gift"} />
        {/* Search item */}
        <ShopSearch/>
        {/* Gift Tab Categories  */}
        <GiftCategoryTabs/>
         {/* display the items    */}
         <CardItems/>

    </Box>
  );
};

export default EventShop;

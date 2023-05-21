import React, { useId } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import {
  getItems,
  getItemsByCategory,
  clearItems,
} from "../context/features/itemSlice";

export default function GiftCategoryTabs({ categories }) {
  const dispatch = useDispatch();
  const uniqueId = useId;
  const [value, setValue] = React.useState(0);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      dispatch(clearItems());
      dispatch(getItems());
    } else {
      dispatch(clearItems());
      dispatch(getItemsByCategory(newValue));
    }
  };
  return (
    <Box
      sx={{
        maxWidth: { xs: 400, sm: 600, md: 780 },
        bgcolor: "background.paper",
        mt: 1,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
        sx={{
          "& button": {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "bold",
          },
        }}
      >
        <Tab key={uniqueId} label="All" />
        {categories.map((tab) => {
          return <Tab key={tab.id} label={tab.sub_cat_name} />;
        })}
      </Tabs>
    </Box>
  );
}

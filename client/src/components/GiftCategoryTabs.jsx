import React, { useId, useMemo } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getItems,
  getItemsByCategory,
  getItemsBySubCategory,
  clearItems,
  getSubcategories,
} from "../context/features/itemSlice";


export default function GiftCategoryTabs({ categories }) {
  const { item_subcategories } = useSelector((state) => ({
    ...state.item,
  }));
  const memoizedSubCat = useMemo(() => item_subcategories, [item_subcategories]);
  const dispatch = useDispatch();
  const uniqueId = useId;
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null); // State for the dropdown menu
  const open = Boolean(anchorEl);
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      dispatch(clearItems());
      dispatch(getItems());
    } else {
      dispatch(clearItems());
      dispatch(getItemsByCategory(categories[newValue - 1].id));
    }
  };
  
  const handleAllDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(getSubcategories())
  }

  const handleAllDropdownClose = (event) => {
    setAnchorEl(null)

  }

  const handleGetItemsBySubcategory = (id) => {
    handleAllDropdownClose();
    dispatch(clearItems)
    dispatch(getItemsBySubCategory(id));

  }

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
        <Tab 
          aria-controls="menu"
          aria-haspopup="true" 
          key={uniqueId} 
          label="All"
          onClick={handleAllDropdownOpen}/>

        {categories.map((tab) => {
          return <Tab key={tab.id} label={tab.cat_name} />;
        })}
      </Tabs>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleAllDropdownClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* Map through the subcategories and display them as MenuItem components */}
        {memoizedSubCat.map((subcat) => (
          <MenuItem key={subcat.id} onClick={()=> handleGetItemsBySubcategory(subcat.id)}>
            {subcat.sub_cat_name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

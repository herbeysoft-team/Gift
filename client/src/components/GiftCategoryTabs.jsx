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
  // getSubcategories,
} from "../context/features/itemSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function GiftCategoryTabs({ categories }) {
  const { item_subcategories } = useSelector((state) => ({
    ...state.item,
  }));
  const memoizedSubCat = useMemo(
    () => item_subcategories,
    [item_subcategories]
  );
  const dispatch = useDispatch();
  const uniqueId = useId;
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null); // State for the dropdown menu
  const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState({}); // State for individual category submenu
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

  const handleAllDropdownClose = (event) => {
    setAnchorEl(null);
  };

  const handleGetItemsBySubcategory = (id) => {
    setSubMenuAnchorEl(false);
    dispatch(clearItems);
    dispatch(getItemsBySubCategory(id));
  };
  const handleCategoryDropdownOpen = (event, categoryId) => {
    setSubMenuAnchorEl((prev) => ({
      ...prev,
      [categoryId]: event.currentTarget,
    }));
  };

  const handleCategoryDropdownClose = (categoryId) => {
    setSubMenuAnchorEl((prev) => ({ ...prev, [categoryId]: null }));
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
            display: "flex", // Use flexbox to control the layout
            flexDirection: "row",
            justifyContent: "space-between", // Align content to the right
            alignItems: "center", // Center items vertically
          },
        }}
      >
        <Tab
          aria-controls="menu"
          aria-haspopup="true"
          key={uniqueId}
          label="All"
          onClick={() => {}}
        />

        {categories.map((tab) => {
          return (
            <Tab
              key={tab.id}
              label={
                <>
                  {tab.cat_name}
                  <ArrowDropDownIcon />
                </>
              }
              aria-controls={`submenu-${tab.id}`} // Unique ID for each submenu
              aria-haspopup="true"
              onClick={(event) => handleCategoryDropdownOpen(event, tab.id)}
            />
          );
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
          <MenuItem
            key={subcat.id}
            onClick={() => handleGetItemsBySubcategory(subcat.id)}
          >
            {subcat.sub_cat_name}
          </MenuItem>
        ))}
      </Menu>
      {/* Render submenus for individual categories */}
      {categories.map((tab) => (
        <Menu
          key={`submenu-${tab.id}`}
          id={`submenu-${tab.id}`}
          anchorEl={subMenuAnchorEl[tab.id]}
          open={Boolean(subMenuAnchorEl[tab.id])}
          onClose={() => handleCategoryDropdownClose(tab.id)}
          MenuListProps={{
            "aria-labelledby": `submenu-${tab.id}`,
          }}
        >
          {memoizedSubCat
            .filter((subcat) => subcat.cat_id === tab.id)
            .map((subcat) => (
              <MenuItem
                key={subcat.id}
                onClick={() => handleGetItemsBySubcategory(subcat.id)}
              >
                {subcat.sub_cat_name}
              </MenuItem>
            ))}
        </Menu>
      ))}
    </Box>
  );
}

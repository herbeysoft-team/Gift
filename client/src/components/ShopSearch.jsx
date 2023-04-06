import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TocIcon from "@mui/icons-material/Toc";
import {  IconButton, InputBase, Box } from "@mui/material";

const ShopSearch = () => {
  return (
    <Box
        component="form"
      sx={{
        width: "90%",
        p: "2px",
        mt: 1,
        mx: 2,
        display: { xs: "flex", md: "flex" },
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: 20,
        flexGrow: 1,
      }}
    >
      <IconButton sx={{ p: "10px" }}>
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        name="searchName"
        type="text"
        id="searchName"
      />
      <IconButton type="submit" sx={{ p: "10px", backgroundColor: "#d676af" }}>
        <TocIcon />
      </IconButton>
    </Box>
  );
};

export default ShopSearch;

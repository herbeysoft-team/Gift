import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TocIcon from "@mui/icons-material/Toc";
import { IconButton, InputBase, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { getSearchUsers } from "../context/features/userSlice";

const MobileSearchBox = () => {
  const dispatch = useDispatch();
  //function called when any input  value is changed
  const onSearchChange = (e) => {
    const searchName = e.target.value;
    if (searchName.length > 3) {
      dispatch(getSearchUsers(searchName));
    } else {
    }
  };
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
        <TocIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search people.."
        name="searchName"
        onChange={onSearchChange}
        type="text"
        id="searchName"
      />
      <IconButton onClick={onSearchChange} sx={{ p: "10px", backgroundColor: "#d676af" }}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default MobileSearchBox;

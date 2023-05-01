import { IconButton, InputBase, Paper } from '@mui/material';
import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from '@mui/icons-material/Person';

const SearchCard = () => {
  return (
    <Paper
      component="form"
      elevation={0}
      sx={{
        p: "2px 4px",
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        width: 400,
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
        placeholder="Search People...."
        name="searchName"
        // onChange={onSearchChange}
        type="text"
        id="searchName"
      />
      <IconButton type="submit" sx={{ p: "10px" }}>
        <PersonIcon />
      </IconButton>
    </Paper>
  );
  
}

export default SearchCard

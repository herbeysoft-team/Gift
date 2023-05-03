import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { getSearchUsers } from "../context/features/userSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { deepPurple } from "@mui/material/colors";
import { useNavigate} from "react-router-dom";


const SearchCard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { searchUsers } = useSelector((state) => ({ ...state.user }));

  //function called when any input  value is changed
  const onSearchChange = (e) => {
    const searchName = e.target.value;
    if (searchName.length > 3) {
      dispatch(getSearchUsers(searchName));
    } else {
    }
  };
  const handleSearch = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (id) => {
    if(id){
      navigate(`/home/profile/${id}`)
    }
      setAnchorEl(null);
    };
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
        <PersonIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search People...."
        name="searchName"
        onChange={onSearchChange}
        type="text"
        id="searchName"
      />
      <IconButton onClick={handleSearch} sx={{ p: "10px" }}>
        <SearchIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{ my: 1, width: "100%" }}
      >
        {searchUsers.map((user, index) => {
          return (
        <MenuItem onClick={()=> handleClose(user.userId)} key={user.userId}>
          <Box
            display="flex"
            gap={7}
            sx={{ justifyContent: "space-between"}}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                flex: 3,
              }}
            >
              <Avatar alt="PP" src={user?.profilePic} sx={{ bgcolor: deepPurple[500] }} />
              <Typography variant="body">{user?.fullname}</Typography>
            </Box>
          </Box>
        </MenuItem>
         );
        })}

      </Menu>
          
    </Paper>
  );
};

export default SearchCard;

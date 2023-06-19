import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  Avatar,
  Box,
  CardMedia,
  Checkbox,
  Divider,
  Fab,
  IconButton,
  InputBase,
  Tooltip,
  Typography,
} from "@mui/material";
import MobileNavBar from "../components/MobileNavBar";
import { sendMessageMedia } from "../context/features/messageSlice";
import Logo from "../assets/logo.png";
import URLBASE from "../constant/urlbase";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MobileSearchBox from "../components/MobileSearchBox";
import { deepPurple } from "@mui/material/colors";
import IosShareIcon from '@mui/icons-material/IosShare';

const Share = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { searchUsers } = useSelector((state) => ({ ...state.user }));
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const post = location.state;

  const handleProfile = (id) => {
    if (id) {
      navigate(`/home/profile/${id}`);
    }
  };

  //function called when any input value is changed
  const onInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCheckboxChange = (userId) => {
    const isSelected = selectedUsers.includes(userId);
    // If user is already selected, return without making any changes
    if (isSelected) {
      return;
    }

    // Deselect all users except the current one
    const updatedUsers = [userId];
    setSelectedUsers(updatedUsers);
  };

  const handleShare= (e) => {
    e.preventDefault();
    //Function to retrow
    if (!commentText) {
      toast.error("please add a caption");
    } else {
      dispatch(
        sendMessageMedia({
          formData: {
            userId: selectedUsers[0],
            post_id: post?.post_id,
            post_pic: post?.event_pics,
            commentText
          },
          navigate,
          toast,
          userId: selectedUsers[0]
        })
      );
    }
  };


  return (
    <Box flex={3}>
      <MobileNavBar logo={Logo} title={"Share"} />

      <MobileSearchBox />
      {/* The Event Details Start Here  */}
      <Box
        position="sticky"
        sx={{
          marginTop: 1,
          marginRight: 1,
          marginLeft: 1,
          marginBottom: 3,
          top: 10,
          left: 0,
          right: 0,
          boxShadow: "1",
          borderRadius: "5",
          zIndex: 2,
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="auto"
            fit="cover"
            image={`${URLBASE.imageBaseUrl}${post?.event_pics}`}
            alt="Event Image"
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0.2,
              backgroundColor: "white",
              opacity: 0.7,
              px: 1,
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              fontFamily="Poppins"
              fontWeight="mediuum"
            >
              {post?.event_name.length > 20
                ? `${post?.event_name.substring(0, 17)}...`
                : post?.event_name}
            </Typography>
            <Divider />
            <Typography variant="caption" color="primary" fontFamily="Poppins">
              {post?.event_purpose.length > 30
                ? `${post?.event_purpose.substring(0, 27)}...`
                : post?.event_purpose}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          justifyItems="center"
          sx={{ backgroundColor: "white", p: 1, zIndex: 2 }}
        >
          <Box sx={{ width: "100%",  border: "1px solid #ccc",
        borderRadius: 20, padding:1 }} >
          <InputBase
            sx={{ ml: 1, flex: 1, width: "100%" }}
            placeholder="Add a caption..."
            name="commentText"
            type="text"
            id="commentText"
            onChange={onInputChange}
            value={commentText|| ""}
      />
          </Box>
        </Box>

        {/* the users to share */}
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            py={1}
            px={1}
            gap={1}
            sx={{ justifyContent: "center" }}
          >
            {searchUsers.map((user, index) => {
              return (
                <Box
                  key={user.userId}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 0.1,
                    gap: 1,
                    flex: 3,
                    borderBottom: "1px solid #aaa",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Avatar
                      alt="PP"
                      src={`${URLBASE.imageBaseUrl}${user?.profilePic}`}
                      sx={{ bgcolor: deepPurple[500] }}
                      onClick={() => handleProfile(user?.userId)}
                    />
                    <Typography variant="body">{user?.fullname}</Typography>
                  </Box>

                  <IconButton aria-label="wishlist" size="large">
                    <Checkbox
                      icon={
                        <CheckBoxOutlineBlankIcon
                          sx={{ color: "purple", fontSize: 24 }}
                        />
                      }
                      checkedIcon={
                        <CheckBoxIcon sx={{ color: "purple", fontSize: 24 }} />
                      }
                      checked={selectedUsers?.includes(user?.userId)}
                      onChange={() => handleCheckboxChange(user?.userId)}
                    />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
          {selectedUsers.length > 0 ? (
            <Tooltip
              onClick={handleShare}
              title="Share"
              sx={{
                position: "fixed",
                bottom: 40,
                left: { xs: "calc(50% - 25px)", md: 30 },
              }}
            >
              <Fab color="primary" aria-label="Add Item">
                <IosShareIcon />
              </Fab>
            </Tooltip>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Share;

import React from "react";
import {
  Box,
  Typography,
  Avatar,
  styled,
  Button,
  Divider,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const FollowButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  paddingLeft: 20,
  paddingRight: 20,
  fontSize: 10,
  justifyContent:"flex-end",
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Leftbar = () => {
  return (
    <Box
      flex={1.5}
      p={2}
      height="100vh"
      sx={{ display: { xs: "none", sm: "none", md:"none", lg:"block" } }}
    >
      <Box position="fixed">
        <Typography
          variant="body"
          sx={{ fontWeight: "medium", fontSize: "18px" }}
        >
          Suggested for you
        </Typography>
        <Divider sx={{ height: "10px", marginBottom: "20px" }} />
        <Box display="flex" gap={5} sx={{justifyContent:"space-between", mb:2}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              flex:3,
            }}
          >
            <Avatar
              alt="PP"
              src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
              sx={{ bgcolor: deepPurple[500] }}
            />
            <Typography variant="body">Abiodun Adam</Typography>
          </Box>
          <Box sx={{
              display: "flex",
              flex:1,
            }}>
            <FollowButton>Follow</FollowButton>
          </Box>
          
        </Box>
        <Box display="flex" gap={5} sx={{justifyContent:"space-between", mb:2}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              flex:3,
            }}
          >
            <Avatar
              alt="PP"
              src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
              sx={{ bgcolor: deepPurple[500] }}
            />
            <Typography variant="body">Fatimoh Adam</Typography>
          </Box>
          <Box sx={{
              display: "flex",
              flex:1,
            }}>
            <FollowButton>Follow</FollowButton>
          </Box>
          
          
        </Box>
        <Box display="flex" gap={5} sx={{justifyContent:"space-between", mb:2}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              flex:3,
            }}
          >
            <Avatar
              alt="PP"
              src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
              sx={{ bgcolor: deepPurple[500] }}
            />
            <Typography variant="body">Kamaldeen Yunus</Typography>
          </Box>
          <Box sx={{
              display: "flex",
              flex:1,
            }}>
            <FollowButton>Follow</FollowButton>
          </Box>
          
          
        </Box>
        <Box display="flex" gap={5} sx={{justifyContent:"space-between", mb:2}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              flex:3,
            }}
          >
            <Avatar
              alt="PP"
              src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
              sx={{ bgcolor: deepPurple[500] }}
            />
            <Typography variant="body">Zayad Musa</Typography>
          </Box>
          <Box sx={{
              display: "flex",
              flex:1,
            }}>
            <FollowButton>Follow</FollowButton>
          </Box>
          
          
        </Box>
        <Box display="flex" gap={5} sx={{justifyContent:"space-between", mb:2}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              flex:3,
            }}
          >
            <Avatar
              alt="PP"
              src=""
              sx={{ bgcolor: deepPurple[500] }}
            />
            <Typography variant="body">Rukayyat Saad</Typography>
          </Box>
          <Box sx={{
              display: "flex",
              flex:1,
            }}>
            <FollowButton>Follow</FollowButton>
          </Box>
          
          
        </Box>
    


        
        
      </Box>
    </Box>
  );
};

export default Leftbar;

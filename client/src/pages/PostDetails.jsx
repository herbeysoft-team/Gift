import {
  Box,
  CardMedia,
  Checkbox,
  Divider,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import {
  CardGiftcard,
  DoneAll,
  Send,
  MoreVert,
  StarBorder,
  Star,
} from "@mui/icons-material";
import PostGift from "../components/PostGift";

const PostDetails = () => {
  return (
    <Box flex={3}>
      <MobileNavBar logo={Logo} title={"Post"} />
      {/* The Post Details Start Here  */}
      <Box
        position="sticky"
        sx={{
          marginTop: 1,
          marginRight: 1,
          marginLeft: 1,
          marginBottom: 3,
          boxShadow: "2",
          borderRadius: "5",
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="auto"
            fit="cover"
            image="https://th.bing.com/th/id/OIP.iPkt7kskdztbDzNLHx3BOgHaEi?pid=ImgDet&w=1200&h=736&rs=1"
            alt="Post Image"
          />
          <IconButton
            aria-label="option"
            size="large"
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <Checkbox
              icon={<MoreVert sx={{ color: "white", fontSize: 32 }} />}
              checkedIcon={<MoreVert sx={{ color: "purple", fontSize: 32 }} />}
            />
          </IconButton>
          <IconButton
            aria-label="like"
            size="large"
            sx={{ position: "absolute", top: 0, left: 0 }}
          >
            <Checkbox
              icon={<StarBorder sx={{ color: "white", fontSize: 32 }} />}
              checkedIcon={<Star sx={{ color: "purple", fontSize: 32 }} />}
            />
          </IconButton>
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
              variant="h4"
              color="primary"
              fontFamily="Poppins"
              fontWeight="mediuum"
            >
              Product Lunch
            </Typography>
            <Divider />
            <Typography variant="caption" color="primary" fontFamily="Poppins">
              The app is about to lunch for the first time
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ color: "white", borderRadius: 10, p: 1 }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="caption" color="secondary">
              2345
            </Typography>
            <Icon>
              <CardGiftcard color="secondary" />
            </Icon>
            <Typography variant="caption" color="secondary">
              Retrow
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="caption" color="secondary">
              45
            </Typography>
            <Icon>
              <DoneAll color="secondary" />
            </Icon>
            <Typography variant="caption" color="secondary">
              Upvote
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="caption" color="secondary">
              42
            </Typography>
            <Icon>
              <Send color="secondary" />
            </Icon>
            <Typography variant="caption" color="secondary">
              Share
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* The Gift for the post */}
      <Box sx={{overflow:"scroll", maxHeight:"50%"}}>

      
      <Typography
        variant="h6"
        color="primary"
        fontFamily="Poppins"
        fontWeight="bold"
        textAlign="center"
      >
        GIFT ITEMS
      </Typography>
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      <PostGift />
      
      </Box>
    </Box>
  );
};

export default PostDetails;

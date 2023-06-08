import {
    Box,
    Button,
    CardMedia,
    Checkbox,
    Divider,
    Icon,
    IconButton,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import MobileNavBar from "../components/MobileNavBar";
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
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

  
  const EventDetails = () => {
    const [gift, setGift] = useState(false);
    const [btnName, setBtnName] = useState("SHOW GIFT ITEMS");
    const [iconGift, setIconGift] = useState(<ArrowDropDownIcon />);
    return (
      <Box flex={3}>
        <MobileNavBar logo={Logo} title={"Event"} />
        {/* The Post Details Start Here  */}
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
            boxShadow: "2",
            borderRadius: "5",
            zIndex: 2,
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
            sx={{ backgroundColor: "white", p: 1, zIndex: 2 }}
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
        {/* Friennds who comment */}
        {/* <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={1}
          px={1.5}
        >
          <AvatarGroup max={4}>
            <Avatar
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
            <Avatar
              alt="Travis Howard"
              src="https://material-ui.com/static/images/avatar/2.jpg"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/3.jpg"
            />
            <Avatar alt="Agnes Walker" src="" />
          </AvatarGroup>
          <Typography
            variant="body"
            color="primary"
            sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
          >
            +345
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            sx={{ fontFamily: "Poppins", fontWeight: "medium" }}
          >
            Friends who comment
          </Typography>
        </Box> */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="self-start"
          px={1.5}
        >
          {/* The Gift for the post */}
          <Button
            variant="text"
            onClick={() => {
              setGift(!gift);
              if (!gift) {
                setBtnName("HIDE GIFT ITEMS");
                setIconGift(<ArrowDropDownIcon />);
              } else {
                setBtnName("SHOW GIFT ITEMS");
                setIconGift(<ArrowDropUpIcon />);
              }
            }}
            sx={{
              color: "primary",
              fontFamily: "Poppins",
              fontWeight: "bold",
              textAlign: "center",
            }}
            endIcon={iconGift}
          >
            {btnName}
          </Button>
          {gift ? (
            <Box>
              <PostGift />
              <PostGift />
              <PostGift />
            </Box>
          ) : null}
  
          </Box>
        
      </Box>
    );
  };
  
  export default EventDetails;
  
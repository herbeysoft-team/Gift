import React from "react";
import {
  Favorite,
  FavoriteBorder,
  CardGiftcard,
  DoneAll,
  Send,
  MoreVert,
} from "@mui/icons-material";
import {
  Avatar,
  CardActions,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
  Box,
  AvatarGroup,
  Icon,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import URLBASE from "../constant/urlbase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment"

const Post = ({box}) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <Box sx={{ marginTop: 1, mx: 0.5, marginBottom: 3, boxShadow: "2" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="auto"
          fit="cover"
          image={`${URLBASE.imageBaseUrl}${box?.event_pics}`}
          alt="Post Image"
        />
        <IconButton
          aria-label="upvote"
          size="large"
          sx={{ position: "absolute", top: 5, right: 5 }}
        >
          <Checkbox
            icon={<FavoriteBorder sx={{ color: "white", fontSize: 32 }} />}
            checkedIcon={<Favorite sx={{ color: "purple", fontSize: 32 }} />}
          />
        </IconButton>
        <Box
          display="flex"
          flexDirection="row"
          gap={1}
          alignItems="center"
          p={1}
          sx={{
            position: "absolute",
            top: 5,
            left: 5,
            boxShadow: 1,
            borderRadius: 10,
          }}
        >
          <Avatar alt={`PP`} src={`${URLBASE.imageBaseUrl}${box?.profilePic}`} sx={{ bgcolor: deepPurple[500] }} />
          <Typography variant="body" color={"white"}>
            
          {parseInt(user?.result.id) ===
              parseInt(box?.user_id)
                ? "You"
                : box?.fullname.length > 15
                ? `${box?.fullname.substring(0, 15)}...`
                : box?.fullname}
          </Typography>
        </Box>
      </Box>

      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert sx={{ color: "purple", fontSize: 32 }} />
          </IconButton>
        }
        titleTypographyProps={{ variant: "h6", sx: { fontFamily: "Poppins" } }}
        subheaderTypographyProps={{
          variant: "body2",
          sx: { fontFamily: "Poppins" },
        }}
        title={box?.event_name}
        subheader={box?.description}
        sx={{ borderBottom: "0.5px solid lightgray" }}
      />

      <CardActions disableSpacing>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          pl={{ xs: 0, md: 1 }}
          pr={{ xs: 0, md: 1 }}
        >
          <Box
            display="flex"
            flexDirection="column"
            color="purple"
            pl={{ xs: 0, md: 1 }}
            pr={{ xs: 0, md: 1 }}
          >
            <Typography variant="caption" sx={{fontFamily:"Poppins"}}>{moment(box?.createdAt).fromNow()}</Typography>
            <Typography variant="caption" color="secondary" sx={{fontFamily:"Poppins"}}>
              Friends who comment
            </Typography>
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
          </Box>
          <Box display="flex" flexDirection="row" gap={1}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="caption" color="secondary">
                2345
              </Typography>
              <Icon>
                <CardGiftcard color="secondary" />
              </Icon>
              <Typography variant="caption" color="secondary"sx={{fontFamily:"Poppins"}}>
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
              <Typography variant="caption" color="secondary"sx={{fontFamily:"Poppins"}}>
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
              <Typography variant="caption" color="secondary"sx={{fontFamily:"Poppins"}}>
                Share
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardActions>
    </Box>
  );
};

export default Post;

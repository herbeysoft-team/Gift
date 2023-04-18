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

const Post = () => {
  return (
    <Box sx={{ marginTop: 1, marginRight:1, marginLeft:1, marginBottom:3, boxShadow: "2", }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="auto"
          fit="cover"
          image="https://th.bing.com/th/id/OIP.iPkt7kskdztbDzNLHx3BOgHaEi?pid=ImgDet&w=1200&h=736&rs=1"
          alt="Post Image"
        />
        <IconButton
          aria-label="upvote"
          size="large"
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <Checkbox
            icon={<FavoriteBorder sx={{ color: "white", fontSize: 32 }} />}
            checkedIcon={<Favorite sx={{ color: "purple", fontSize: 32 }} />}
          />
        </IconButton>
      </Box>

      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert sx={{ color: "purple", fontSize: 32 }} />
          </IconButton>
        }
        title="Wizkid's Birthday"
        sx={{ borderBottom: "0.5px solid lightgray" }}
      />

      <CardActions disableSpacing>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          pl={{xs:0, md:1}}
          pr={{xs:0, md:1}}
        >
          <Box
            display="flex"
            flexDirection="column"
            color="purple"
            pl={{xs:0, md:1}}
            pr={{xs:0, md:1}}
          >
            <Typography variant="body">2 minutes ago</Typography>
            <Typography variant="caption" color="secondary">
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
      </CardActions>
    </Box>
  );
};

export default Post;

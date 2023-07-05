import React, { useEffect, useState } from "react";
import {
  Favorite,
  FavoriteBorder,
  CardGiftcard,
  DoneAll,
  Send,
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
  Skeleton,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import URLBASE from "../constant/urlbase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { getComments } from "../context/features/commentSlice";
import { getLikes, addLike } from "../context/features/likeSlice";
import { getRetrow } from "../context/features/retrowSlice";
import { getShare } from "../context/features/shareSlice";
import toast from "react-hot-toast";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lastTapTime, setLastTapTime] = useState(0);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [imageLoaded, setImageLoaded] = useState(false);


  // Filter the comments based on the post ID
  const comments = useSelector((state) => state.comment[post?.post_id] || []);

  // Filter the likes based on the post ID
  const likes = useSelector((state) => state.like[post?.post_id] || []);

  // Filter the likes based on the post ID
  const retrow = useSelector((state) => state.retrow[post?.id] || []);

  // Filter the share based on the post ID
  const share = useSelector((state) => state.share[post?.post_id] || []);

  const handleToggleLike = (id) => {
    const isSelected = likes.includes(user?.result?.id);

    if (isSelected) {
      //then dislike the item
      //dispatch(deleteLike({ id, toast }));
      dispatch(getLikes(post?.post_id));
    } else {
      dispatch(
        addLike({
          formData: {
            postId: id,
          },
          toast,
        })
      );
      dispatch(getLikes(post?.post_id));
    }
  };

  const handleGoPost = (id) => {
    if (id && post) {
      navigate(`/home/postdetails/${id}`);
    }
  };

  const handleGoProfile = (id) => {
    if (id) {
      navigate(`/home/profile/${id}`);
    }
  };

  useEffect(() => {
    if (post?.post_id) {
      dispatch(getComments(post?.post_id));
    }
  }, [post?.post_id, dispatch]);

  useEffect(() => {
    if (post?.post_id) {
      dispatch(getLikes(post?.post_id));
    }
  }, [post?.post_id, dispatch]);

  useEffect(() => {
    if (post?.post_id) {
      dispatch(getShare(post?.post_id));
    }
  }, [post?.post_id, dispatch]);

  useEffect(() => {
    if (post?.id) {
      dispatch(getRetrow(post?.id));
    }
  }, [post?.id, dispatch]);

  const handleDoubleTap = () => {
    const currentTime = new Date().getTime();
    const doubleTapDelay = 300; // Adjust this value as per your preference

    if (currentTime - lastTapTime < doubleTapDelay) {
      handleToggleLike(post?.post_id);
      dispatch(getLikes(post?.post_id));
    } else {
      setLastTapTime(currentTime);
    }
  };

  const handleRetrow = () => {
    navigate("/home/retrowbox/", { state: post });
  };

  const handleShare = () => {
    navigate("/home/share/", { state: post });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box sx={{ marginTop: 1, mx: 0.5, marginBottom: 3, boxShadow: "2" }}>
      <Box sx={{ position: "relative" }}>
        {!imageLoaded && (
          <Skeleton variant="rectangular" animation="wave" width="100%" height={200} />
        )}

        <CardMedia
          component="img"
          height="auto"
          fit="cover"
          image={`${URLBASE.imageBaseUrl}${post?.event_pics}`}
          alt="Post Image"
          onClick={handleDoubleTap}
          onLoad={handleImageLoad}
          sx={{ display: imageLoaded ? "block" : "none" }}
        />

        <IconButton
          aria-label="upvote"
          size="large"
          sx={{ position: "absolute", top: 5, right: 5 }}
        >
          <Checkbox
            icon={<FavoriteBorder sx={{ color: "white", fontSize: 32 }} />}
            checkedIcon={<Favorite sx={{ color: "purple", fontSize: 32 }} />}
            checked={likes.includes(user?.result?.id)}
            onChange={() => handleToggleLike(post?.post_id)}
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
          onClick={() => handleGoProfile(post?.user_id)}
        >
          <Avatar
            alt={`PP`}
            src={`${URLBASE.imageBaseUrl}${post?.profilePic}`}
            sx={{ bgcolor: deepPurple[500] }}
          />
          <Typography variant="body" color={"white"}>
            {parseInt(user?.result.id) === parseInt(post?.user_id)
              ? "You"
              : post?.fullname.length > 15
              ? `${post?.fullname.substring(0, 15)}...`
              : post?.fullname}
          </Typography>
        </Box>
      </Box>

      <CardHeader
        onClick={() => handleGoPost(post?.post_id)}
        titleTypographyProps={{
          variant: "h6",
          sx: { fontFamily: "Poppins", color: "purple" },
        }}
        subheaderTypographyProps={{
          variant: "body2",
          sx: { fontFamily: "Poppins" },
        }}
        title={post?.event_name}
        subheader={post?.description}
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
          //onClick={() => handleGoPost(post?.post_id)}
        >
          <Box
            display="flex"
            flexDirection="column"
            color="purple"
            pl={{ xs: 0, md: 1 }}
            pr={{ xs: 0, md: 1 }}
          >
            <Typography variant="caption" sx={{ fontFamily: "Poppins" }}>
              {moment(post?.createdAt).fromNow()}
            </Typography>
            <Typography
              variant="caption"
              color="secondary"
              sx={{ fontFamily: "Poppins" }}
            >
              {comments?.length > 0 ? "Friends who comment" : "No comment"}
            </Typography>
            <AvatarGroup max={4} sx={{ alignSelf: "flex-start" }}>
              {comments?.length > 0
                ? comments.map((c) => {
                    return (
                      <Avatar
                        key={c.id}
                        alt="PP"
                        src={`${URLBASE.imageBaseUrl}${c?.profilePic}`}
                      />
                    );
                  })
                : null}
            </AvatarGroup>
          </Box>
          <Box display="flex" flexDirection="row" gap={1}>
            <Box display="flex" flexDirection="column" alignItems="center" onClick={handleRetrow}>
              <Typography variant="caption" color="secondary">
                {retrow?.length > 0 ? retrow?.length : "0"}
              </Typography>
              <Icon>
                <CardGiftcard color="secondary" />
              </Icon>
              <Typography
                variant="caption"
                color="secondary"
                sx={{ fontFamily: "Poppins" }}
              >
                Retrow
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" onClick={() => handleToggleLike(post?.post_id)}>
              <Typography variant="caption" color="secondary">
                {likes?.length > 0 ? likes?.length : "0"}
              </Typography>
              <Icon>
                <DoneAll color="secondary" />
              </Icon>
              <Typography
                variant="caption"
                color="secondary"
                sx={{ fontFamily: "Poppins" }}
              >
                Upvote
              </Typography>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center" onClick={handleShare}>
              <Typography variant="caption" color="secondary">
                {share?.length > 0 ? share?.length : "0"}
              </Typography>
              <Icon>
                <Send color="secondary" />
              </Icon>
              <Typography
                variant="caption"
                color="secondary"
                sx={{ fontFamily: "Poppins" }}
              >
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

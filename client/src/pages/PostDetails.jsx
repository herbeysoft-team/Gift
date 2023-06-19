import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CardMedia,
  Checkbox,
  Divider,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { useState, useEffect, useMemo } from "react";
import MobileNavBar from "../components/MobileNavBar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Logo from "../assets/logo.png";
import {
  CardGiftcard,
  DoneAll,
  Send,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import PostGift from "../components/PostGift";
import PostComment from "../components/PostComment";
import CommentBox from "../components/CommentBox";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsForPost } from "../context/features/commentSlice";
import { getLikesForPost, addLike } from "../context/features/likeSlice";
import { getRetrowForPost } from "../context/features/retrowSlice";
import { getShareForPost } from "../context/features/shareSlice";
import URLBASE from "../constant/urlbase";
import toast from "react-hot-toast";
import { getPost } from "../context/features/postSlice";

const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useLocation().pathname.split("/")[3];
  const { post } = useSelector((state)=> ({...state.post}))
  const { commentsforPost } = useSelector((state) => ({ ...state.comment }));
  const { likesforPost } = useSelector((state) => ({ ...state.like }));
  const { retrowforpost } = useSelector((state) => ({ ...state.retrow }));
  const { shareforpost } = useSelector((state) => ({ ...state.share }));
  const [gift, setGift] = useState(false);
  const [btnName, setBtnName] = useState("SHOW GIFT ITEMS");
  const [iconGift, setIconGift] = useState(<ArrowDropDownIcon />);
  const [comment, setComment] = useState(false);
  const [btnCommentName, setBtnCommentName] = useState("SHOW COMMENTS");
  const [iconComment, setIconComment] = useState(<ArrowDropDownIcon />);
  const memoizedComments = useMemo(() => commentsforPost, [commentsforPost]);
  const [lastTapTime, setLastTapTime] = useState(0);
  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if (id) {
      dispatch(getPost(id))
      dispatch(getCommentsForPost(id));
      dispatch(getLikesForPost(id));
      dispatch(getShareForPost(id))
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(getRetrowForPost(post?.event_box?.id));
    }
  }, [dispatch, post]);

  const handleDoubleTap = () => {
    const currentTime = new Date().getTime();
    const doubleTapDelay = 300; // Adjust this value as per your preference

    if (currentTime - lastTapTime < doubleTapDelay) {
      handleToggleLike(id);
      dispatch(getLikesForPost(id));
    } else {
      setLastTapTime(currentTime);
    }
  };

  const handleToggleLike = (id) => {
    const isSelected = likesforPost.includes(user?.result?.id);

    if (isSelected) {
      //then dislike the item
      //dispatch(deleteLike({ id, toast }));
      dispatch(getLikesForPost(id));
    } else {
      dispatch(
        addLike({
          formData: {
            postId: id,
          },
          toast,
        })
      );
      dispatch(getLikesForPost(id));
    }
  };

  const handleGoProfile = (id) => {
    if (id) {
      navigate(`/home/profile/${id}`);
    }
  };

  return (
    <Box flex={3}>
      <MobileNavBar logo={Logo} title={"Post"} />
      {/* The Post Details Start Here  */}
      <Box
        sx={{
          marginTop: 1,
          marginRight: 1,
          marginLeft: 1,
          marginBottom: 3,
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
            image={`${URLBASE.imageBaseUrl}${post?.event_box?.event_pics}`}
            alt="Post Image"
            onClick={handleDoubleTap}
          />

          <IconButton
            aria-label="upvote"
            size="large"
            sx={{ position: "absolute", top: 5, right: 5 }}
          >
            <Checkbox
              icon={<FavoriteBorder sx={{ color: "white", fontSize: 32 }} />}
              checkedIcon={<Favorite sx={{ color: "purple", fontSize: 32 }} />}
              checked={likesforPost.includes(user?.result?.id)}
              onChange={() => handleToggleLike(id)}
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
            onClick={() => handleGoProfile(post?.event_box?.user_id)}
          >
            <Avatar
              alt={`PP`}
              src={`${URLBASE.imageBaseUrl}${post?.event_box?.profilePic}`}
              sx={{ bgcolor: deepPurple[500] }}
            />
            <Typography variant="body" color={"white"}>
              {parseInt(user?.result.id) === parseInt(post?.event_box?.user_id)
                ? "You"
                : post?.event_box?.fullname.length > 15
                ? `${post?.event_box?.fullname.substring(0, 15)}...`
                : post?.event_box?.fullname}
            </Typography>
          </Box>
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
              {post?.event_box?.event_name.length > 20
                ? `${post?.event_box?.event_name.substring(0, 17)}...`
                : post?.event_box?.event_name}
            </Typography>
            <Divider />
            <Typography variant="caption" color="primary" fontFamily="Poppins">
              {post?.event_box?.description.length > 140
                ? `${post?.event_box?.description.substring(0, 137)}...`
                : post?.event_box?.description}
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
              {retrowforpost?.length > 0 ? retrowforpost?.length : "0"}
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
              {likesforPost?.length > 0 ? likesforPost?.length : "0"}
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
            {shareforpost?.length > 0 ? shareforpost?.length : "0"}
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
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={1}
        px={1.5}
      >
        <AvatarGroup max={4} sx={{ alignSelf: "flex-start" }}>
          {memoizedComments?.length > 0
            ? memoizedComments.map((c, index) => {
                return (
                  <Avatar
                    key={index}
                    alt="PP"
                    src={`${URLBASE.imageBaseUrl}${c?.profilePic}`}
                  />
                );
              })
            : null}
        </AvatarGroup>
        <Typography
          variant="body"
          color="primary"
          sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
        >
          {memoizedComments?.length > 0 ? `+${memoizedComments?.length}` : 0}
        </Typography>
        <Typography
          variant="caption"
          color="primary"
          sx={{ fontFamily: "Poppins", fontWeight: "medium" }}
        >
          {memoizedComments?.length > 0 ? "Friends who comment" : "No comment"}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="self-start"
        px={1.5}
        minHeight="70vh"
        paddingBottom="100px"
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
          <>
            {post?.event_gift?.length > 0 ? (
              <Box width="100%">
                {post?.event_gift.map((box, index) => {
                  return <PostGift key={index} box={box} />;
                })}
              </Box>
            ) : (
              <Typography
                variant="h6"
                color="primary"
                fontFamily="Poppins"
                fontWeight="medium"
                textAlign="center"
              >
                No Gift Yet!
              </Typography>
            )}
          </>
        ) : null}

        {/* The Comments for the post */}
        <Button
          variant="text"
          onClick={() => {
            setComment(!comment);
            if (!comment) {
              setBtnCommentName("HIDE COMMENTS");
              setIconComment(<ArrowDropDownIcon />);
            } else {
              setBtnCommentName("SHOW COMMENTS");
              setIconComment(<ArrowDropUpIcon />);
            }
          }}
          sx={{
            color: "primary",
            fontFamily: "Poppins",
            fontWeight: "bold",
            textAlign: "center",
          }}
          endIcon={iconComment}
        >
          {btnCommentName}
        </Button>
        {comment ? (
          <>
            {memoizedComments?.length > 0 ? (
              <Box width="100%">
                {memoizedComments?.map((box, index) => {
                  return <PostComment key={index} box={box} />;
                })}
              </Box>
            ) : (
              <Typography
                variant="h6"
                color="primary"
                fontFamily="Poppins"
                fontWeight="medium"
                textAlign="center"
              >
                No Comment
              </Typography>
            )}
          </>
        ) : null}
        {/* Post Comment Box */}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          padding: "10px",
          backgroundColor: "#ffffff",
          // boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CommentBox postId={id} />
      </Box>
    </Box>
  );
};

export default PostDetails;

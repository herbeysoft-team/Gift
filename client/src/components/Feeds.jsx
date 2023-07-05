import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import Gift from "../assets/gift.png";
import { getPosts } from "../context/features/postSlice";
import { useSelector, useDispatch } from "react-redux";

const Feeds = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { posts, loading } = useSelector((state) => ({ ...state.post }));

  const memoizedPost = useMemo(() => posts, [posts]);

  useEffect(() => {
    dispatch(getPosts({ id: user?.result?.id }));
  }, [dispatch, user?.result?.id]);

  return (
    <Box mb={10}>
      {/* The Gift Box Button */}
      <Box
        onClick={() => navigate("/home/trow")}
        p={2}
        sx={{
          elevation: 2,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
          gap: 1,
        }}
      >
        <Fab
          color={"primary"}
          size="large"
          aria-label="add"
          onClick={() => navigate("/home/trow")}
        >
          <img src={Gift} alt="logo" width={24} height={24} />
        </Fab>
        <Typography variant="body">Share the love!</Typography>
      </Box>
      {/* The Post Here */}
      {!loading ? (
        <>
          {memoizedPost.length > 0 ? (
            <>
              {memoizedPost.map((post) => {
                return (
                  <Post key={post?.post_id} post={post} loading={loading} />
                );
              })}
            </>
          ) : (
            <Typography
              variant="h6"
              color="primary"
              fontFamily="Poppins"
              fontWeight="medium"
              textAlign="center"
              marginTop="5"
            >
              No Post
            </Typography>
          )}
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="200px" /* Adjust the height as needed */
        >
          <CircularProgress size={52} color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default Feeds;

import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getPostUserUpvote } from "../context/features/likeSlice";
import { useLocation } from "react-router-dom";
import UpvotePostBox from "../components/UpvotePostBox";

const Upvote = () => {
  const userId = useLocation().pathname.split("/")[3];
  const dispatch = useDispatch();
  const { userupvotepost, loadingpostupvote } = useSelector((state) => ({
    ...state.like,
  }));

  useEffect(() => {
    dispatch(getPostUserUpvote(userId));
  }, [dispatch, userId]);

  const memoizedPost = useMemo(() => userupvotepost, [userupvotepost]);

  return (
    <Box mt={{ sm: "none", xs: "none", md: 7, lg: 7 }}>
      <MobileNavBar logo={Logo} title={"Upvote"} />

      {/* Other Sections start here */}
      <Box
        sx={{
          width: "100%",
          px: 1,
          py: 0.5,
          mb: 10,
        }}
      >
        {!loadingpostupvote ? (
          <>
            {memoizedPost.length > 0 ? (
              <>
                {memoizedPost.map((post, index) => {
                  return <UpvotePostBox key={post?.id} post={post} />
                })}
              </>
            ) : (
              <Typography
                variant="h5"
                color="primary"
                fontFamily="Poppins"
                fontWeight="medium"
                textAlign="center"
              >
                No Upvote
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
    </Box>
  );
};

export default Upvote;

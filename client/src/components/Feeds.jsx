import { Box, Fab, Stack, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import Gift from "../assets/gift.png";
import { getPosts } from "../context/features/postSlice";
import { useSelector, useDispatch } from "react-redux";

const Feeds = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { posts } = useSelector((state) => ({ ...state.post }));

  const memoizedPost = useMemo(() => posts, [posts]);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box mb={10}>
      {/* The Gift Box Button */}
      <Box
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
      {memoizedPost.length > 0 ? (
        <>
          {memoizedPost.map((box, index) => {
            return <Post key={box.id} box={box} />;
          })}
          <Stack spacing={2} alignItems="center">
            <TablePagination
              count={posts.length}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </>
      ) : (
        <Typography
          variant="h5"
          color="primary"
          fontFamily="Poppins"
          fontWeight="medium"
          textAlign="center"
        >
          No Post
        </Typography>
      )}
    </Box>
  );
};

export default Feeds;

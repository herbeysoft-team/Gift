import { Avatar, Box, Typography, gridClasses } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { allupvote } from "../context/features/likeSlice";
import SkeletonGrid from "../component/SkeletonGrid";

const Upvote = () => {
  const dispatch = useDispatch();
  const { allVote, loadingallvote } = useSelector((state) => ({
    ...state.like,
  }));
  const [pageSize, setPageSize] = useState(10);
  //const [rowId, setRowId] = useState(null);
  const memoizedVote = useMemo(() => allVote, [allVote]);

  useEffect(() => {
    dispatch(allupvote());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { field: "post_id", headerName: "Post ID", width: 500 },
      { field: "like_count", headerName: "Total Upvote", width: 500 },
    ],
    []
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyItems: "center",
      }}
    >
      <Typography
        component="h4"
        color="secondary.dark"
        variant="h4"
        textAlign="center"
        sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
      >
        Manage Upvote
      </Typography>
      {loadingallvote ? (
        <SkeletonGrid />
      ) : (
        <>
          {memoizedVote ? (
            <DataGrid
              columns={columns}
              rows={memoizedVote}
              getRowId={(row) => row.post_id}
              rowsPerPageOptions={[10, 20, 30]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              getRowSpacing={(params) => ({
                top: params.isFirstVisible ? 0 : 5,
                bottom: params.isLastVisible ? 0 : 5,
              })}
              sx={{
                [`& .${gridClasses.row}`]: {
                  bgcolor: "white",
                },
                marginTop: 5,
              }}
              //   onCellEditCommit={(params) => setRowId(params.id)}
              //   onCellClick={(params) => setRowId(params.id)}
            />
          ) : null}
        </>
      )}
    </Box>
  );
};

export default Upvote;

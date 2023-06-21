import { Avatar, Box, Typography, gridClasses } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { allpost } from "../context/features/postSlice";
import URLBASE from "../constant/urlbase";
import moment from "moment"; 
//import GiftActions from "../component/GiftActions";

const Post = () => {
  const dispatch = useDispatch();
  const { allPost } = useSelector((state) => ({
    ...state.post,
  }));
  const [pageSize, setPageSize] = useState(10);
  //const [rowId, setRowId] = useState(null);
  const memoizedPost = useMemo(() => allPost, [allPost]);

  useEffect(() => {
    dispatch(allpost());
  }, [dispatch]);

    const columns = useMemo(
      () => [
        { field: "post_id", headerName: "Id", width: 50 },
        {
          field: "event_pics",
          headerName: "Avatar",
          width: 60,
          renderCell: (params) => (
            <Avatar
              variant="square"
              src={`${URLBASE.imageBaseUrl}${params.row.event_pics}`}
            />
          ),
          sortable: false,
          filterable: false,
        },
        { field: "id", headerName: "Trowbox ID", width: 150 },
        { field: "fullname", headerName: "Posted By", width: 200 },
        
        { field: "description", headerName: "Post Description", width: 500 },

        {
            field: 'createdAt',
            headerName: 'Posted At',
            width: 200,
            renderCell: (params) =>
            moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
          },
        // {
        //   field: "actions",
        //   headerName: "Actions",
        //   type: "actions",
        //   renderCell: (params) => (
        //     <GiftActions {...{ params, rowId, setRowId }} />
        //   ),
        // },
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
        Manage Post
      </Typography>

      {memoizedPost ? (
        <DataGrid
          columns={columns}
          rows={memoizedPost}
          getRowId={(row) => row.id}
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
    </Box>
  );
};

export default Post;


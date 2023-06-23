import { Avatar, Box, Typography, gridClasses } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { alltrowbox } from "../context/features/trowSlice";
import URLBASE from "../constant/urlbase";
import TrowActions from "../component/TrowActions";
import SkeletonGrid from "../component/SkeletonGrid";

const Trowbox = () => {
  const dispatch = useDispatch();
  const { alltrow, loadingalltrow } = useSelector((state) => ({
    ...state.trow,
  }));
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const memoizedTrow = useMemo(() => alltrow, [alltrow]);

  useEffect(() => {
    dispatch(alltrowbox());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 50 },
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
      { field: "sender_id", headerName: "S.ID", width: 70 },
      { field: "fullname", headerName: "Sender Name", width: 200 },

      { field: "recipient_no", headerName: "Recipient No", width: 150 },
      {
        field: "wishlist_sent",
        headerName: "Wishlist",
        width: 70,
        type: "boolean",
        editable: true,
      },
      {
        field: "gift_sent",
        headerName: "Gift",
        width: 70,
        type: "boolean",
        editable: true,
      },
      {
        field: "post",
        headerName: "Post",
        width: 70,
        type: "boolean",
        editable: true,
      },
      {
        field: "event_name",
        headerName: "Trowbox Purpose",
        width: 200,
        editable: true,
      },
      {
        field: "event_date",
        headerName: "Date",
        width: 150,
        renderCell: (params) => params.row.event_date,
      },

      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <TrowActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
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
        Manage Trowbox
      </Typography>
      {loadingalltrow ? (
        <SkeletonGrid />
      ) : (
        <>
          {memoizedTrow ? (
            <DataGrid
              columns={columns}
              rows={memoizedTrow}
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
              onCellEditCommit={(params) => setRowId(params.id)}
              onCellClick={(params) => setRowId(params.id)}
            />
          ) : null}
        </>
      )}
    </Box>
  );
};

export default Trowbox;

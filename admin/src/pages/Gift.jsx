import { Avatar, Box, Typography, gridClasses } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { allgift } from "../context/features/giftSlice";
import URLBASE from "../constant/urlbase";
import GiftActions from "../component/GiftActions";
import SkeletonGrid from "../component/SkeletonGrid";

const Gift = () => {
  const dispatch = useDispatch();
  const { allGift, loadinggift } = useSelector((state) => ({
    ...state.gift,
  }));
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const memoizedGift = useMemo(() => allGift, [allGift]);

  useEffect(() => {
    dispatch(allgift());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 50 },
      {
        field: "item_pics",
        headerName: "Avatar",
        width: 60,
        renderCell: (params) => (
          <Avatar
            variant="square"
            src={`${URLBASE.imageBaseUrl}${params.row.item_pics}`}
          />
        ),
        sortable: false,
        filterable: false,
      },
      { field: "sender_id", headerName: "S.ID", width: 70 },
      { field: "fullname", headerName: "Sender Name", width: 200 },

      { field: "item_name", headerName: "Gift Name", width: 150 },

      { field: "item_description", headerName: "Gift Description", width: 250 },
      {
        field: "status",
        headerName: "Status",
        width: 100,
        type: "singleSelect",
        valueOptions: ["pending", "redeemed"],
        editable: true,
      },
      { field: "trowbox_id", headerName: "T.ID", width: 70 },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <GiftActions {...{ params, rowId, setRowId }} />
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
        Manage Gift
      </Typography>
      {loadinggift ? (
        <SkeletonGrid />
      ) : (
        <>
          {memoizedGift ? (
            <DataGrid
              columns={columns}
              rows={memoizedGift}
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
          )
        </>
      )}
    </Box>
  );
};

export default Gift;

import { Avatar, Box, Typography, gridClasses } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getItems} from "../context/features/itemSlice";
import URLBASE from "../constant/urlbase";
import ItemActions from "../component/ItemActions";

const Item = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => ({
    ...state.item,
  }));
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const memoizedItem = useMemo(() => items, [items]);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

    const columns = useMemo(
      () => [
        { field: "id", headerName: "Item ID", width: 100 },
        {
          field: "item_pics",
          headerName: "Avatar",
          width: 100,
          renderCell: (params) => (
            <Avatar
              variant="square"
              src={`${URLBASE.imageBaseUrl}${params.row.item_pics}`}
            />
          ),
          sortable: false,
          filterable: false,
        },
        { field: "item_name", headerName: "Item Name", width: 200, editable: true },
        { field: "item_description", headerName: "Item Description", width: 400, editable: true },
        { field: "item_subcategory", headerName: "Subcategory ID", width: 150, editable: true},
        {
          field: "actions",
          headerName: "Actions",
          type: "actions",
          renderCell: (params) => (
            <ItemActions {...{ params, rowId, setRowId }} />
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
        Manage Item
      </Typography>

      {memoizedItem ? (
        <DataGrid
          columns={columns}
          rows={memoizedItem}
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
    </Box>
  );
};

export default Item;



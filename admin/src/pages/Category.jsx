import { Avatar, Box, Typography, gridClasses } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getCategories} from "../context/features/itemSlice";


const Category = () => {
  const dispatch = useDispatch();
  const { item_categories } = useSelector((state) => ({
    ...state.item,
  }));
  const [pageSize, setPageSize] = useState(10);
  //const [rowId, setRowId] = useState(null);
  const memoizedCategory = useMemo(() => item_categories, [item_categories]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  
    const columns = useMemo(
      () => [
        { field: "id", headerName: "Category ID", width: 500 },
        { field: "cat_name", headerName: "Category Name", width: 500 },
        
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
        Manage Item Category
      </Typography>

      {memoizedCategory ? (
        <DataGrid
          columns={columns}
          rows={memoizedCategory}
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

export default Category;


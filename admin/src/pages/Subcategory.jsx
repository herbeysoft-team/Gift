import { Box, Typography, gridClasses } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getSubcategories} from "../context/features/itemSlice";
import SubCatActions from "../component/SubCatActions";


const SubCategory = () => {
  const dispatch = useDispatch();
  const { item_subcategories } = useSelector((state) => ({
    ...state.item,
  }));
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const memoizedSubcategory = useMemo(() => item_subcategories, [item_subcategories]);

  useEffect(() => {
    dispatch(getSubcategories());
  }, [dispatch]);
  
    const columns = useMemo(
      () => [
        { field: "id", headerName: "Subcategory ID", width: 200 },
        { field: "cat_id", headerName: "Category ID", width: 200, editable:true },
        { field: "sub_cat_name", headerName: "Subcategory Name", width: 400, editable: true },
        {
          field: "actions",
          headerName: "Actions",
          type: "actions",
          renderCell: (params) => (
            <SubCatActions {...{ params, rowId, setRowId }} />
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
        Manage Item Subcategory
      </Typography>

      {memoizedSubcategory ? (
        <DataGrid
          columns={columns}
          rows={memoizedSubcategory}
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

export default SubCategory;


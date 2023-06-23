import {
  Box,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  TextField,
  Tooltip,
  Typography,
  gridClasses,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, createCategory } from "../context/features/itemSlice";
import CatActions from "../component/CatActions";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import SkeletonGrid from "../component/SkeletonGrid";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Category = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [cat_name, setCat_name] = useState("");
  const { item_categories, loadingcategories } = useSelector((state) => ({
    ...state.item,
  }));
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const memoizedCategory = useMemo(() => item_categories, [item_categories]);

  const onInputChange = (e) => {
    setCat_name(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cat_name) {
      dispatch(
        createCategory({
          formValue: {
            category_name: cat_name,
          },
          toast,
        })
      );
      dispatch(getCategories());
      setOpen(false);
      setCat_name("");
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Category ID", width: 500 },
      {
        field: "cat_name",
        headerName: "Category Name",
        width: 500,
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => <CatActions {...{ params, rowId, setRowId }} />,
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
        Manage Item Category
      </Typography>

      {loadingcategories ? (
        <SkeletonGrid />
      ) : (
        <>
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
              onCellEditCommit={(params) => setRowId(params.id)}
              onCellClick={(params) => setRowId(params.id)}
            />
          ) : null}
        </>
      )}

      <Tooltip
        onClick={(e) => {
          setOpen(true);
        }}
        title="Create Category"
        placement="bottom"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: "50%" },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={280}
          component="form"
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          noValidate
          autoComplete="off"
        >
          <Typography
            style={{ marginBottom: "20px", fontFamily: "Poppins" }}
            variant="h4"
            textAlign="left"
          >
            Create Category
          </Typography>

          <TextField
            sx={{ width: "100%", marginBottom: "10px" }}
            required
            type="text"
            id="cat_name"
            name="cat_name"
            label="Category"
            value={cat_name || ""}
            size="small"
            color="secondary"
            margin="dense"
            onChange={onInputChange}
          />

          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleSubmit}>Add Category</Button>
            <Button
              color="secondary"
              sx={{ width: "100px" }}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </Box>
  );
};

export default Category;

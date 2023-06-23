import {
  Box,
  Button,
  ButtonGroup,
  Fab,
  MenuItem,
  Modal,
  TextField,
  Tooltip,
  Typography,
  gridClasses,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getSubcategories,
  createSubCategory,
} from "../context/features/itemSlice";
import SubCatActions from "../component/SubCatActions";
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

const SubCategory = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [sub_cat_name, setSub_cat_name] = useState("");
  const [cat_name, set_cat_name] = useState(0);
  const { item_subcategories, item_categories, loadingsubcategories } =
    useSelector((state) => ({
      ...state.item,
    }));
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(null);
  const memoizedSubcategory = useMemo(
    () => item_subcategories,
    [item_subcategories]
  );

  useEffect(() => {
    dispatch(getSubcategories());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "Subcategory ID", width: 200 },
      {
        field: "cat_id",
        headerName: "Category ID",
        width: 200,
        editable: true,
      },
      {
        field: "sub_cat_name",
        headerName: "Subcategory Name",
        width: 400,
        editable: true,
      },
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

  const onInputChange = (e) => {
    setSub_cat_name(e.target.value);
  };

  const onInputChangeCat = (e) => {
    set_cat_name(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sub_cat_name && cat_name) {
      dispatch(
        createSubCategory({
          formValue: {
            category_id: cat_name,
            subcategory: sub_cat_name,
          },
          toast,
        })
      );
      dispatch(getSubcategories());
      setOpen(false);
      setSub_cat_name("");
      set_cat_name("");
    }
  };
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

      {loadingsubcategories ? (
        <SkeletonGrid />
      ) : (
        <>
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
        </>
      )}

      <Tooltip
        onClick={(e) => {
          setOpen(true);
          dispatch(getCategories());
        }}
        title="Create SubCategory"
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
          height={350}
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
            Create SubCategory
          </Typography>

          <TextField
            sx={{ width: "100%", marginBottom: "10px" }}
            required
            type="text"
            id="sub_cat_name"
            name="sub_cat_name"
            label="SubCategory"
            value={sub_cat_name || ""}
            size="small"
            color="secondary"
            margin="dense"
            onChange={onInputChange}
          />
          <TextField
            sx={{ width: "100%" }}
            id="cat_name"
            select
            name="cat_name"
            label="Category"
            value={cat_name || ""}
            size="small"
            color="secondary"
            margin="dense"
            onChange={onInputChangeCat}
          >
            <MenuItem>Select Category</MenuItem>
            {item_categories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.cat_name}
              </MenuItem>
            ))}
          </TextField>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handleSubmit}>Add SubCategory</Button>
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

export default SubCategory;

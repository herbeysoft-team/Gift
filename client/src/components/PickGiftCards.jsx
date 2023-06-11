import { Box, Fab, Grid, Tooltip } from "@mui/material";
import React, { useState, useId, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../context/features/itemSlice";
import { TablePagination } from "@mui/material";
import toast from "react-hot-toast";
import Stack from "@mui/material/Stack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PickGiftCard from "./PickGiftCard";
import { addTrowGift } from "../context/features/trowSlice";

const PickGiftCards = ({ id, navigate, link }) => {
  const uniqueId = useId;
  const dispatch = useDispatch();
  const { items } = useSelector((state) => ({ ...state.item }));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedItems, setSelectedItems] = useState([]);
  const memoizedItems = useMemo(() => items, [items]);

  const handleCheckboxChange = (itemId) => {
    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      // Item is already selected, remove it from the array
      const updatedItems = selectedItems.filter((id) => id !== itemId);
      setSelectedItems(updatedItems);
    } else {
      // Item is not selected, add it to the array
      const updatedItems = [...selectedItems, itemId];
      setSelectedItems(updatedItems);
    }
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  if (!items.length) {
    return null;
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddGiftToTrowbox = (e) => {
    e.preventDefault();
    dispatch(addTrowGift({ id, trowgift: selectedItems, toast, navigate , link}));
  };

  return (
    <Box
      sx={{
        mx: 1,
        mt: 3,
        mb: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {selectedItems.length > 0 ? (
        <Tooltip
          onClick={handleAddGiftToTrowbox}
          title="Add Wishlist"
          sx={{
            position: "fixed",
            bottom: 30,
            left: { xs: "calc(50% - 25px)", md: 30 },
          }}
        >
          <Fab color="primary" aria-label="Add Item">
            <AddShoppingCartIcon />
          </Fab>
        </Tooltip>
      ) : null}

      <Grid key={uniqueId} container rowSpacing={1} columnSpacing={1}>
        {memoizedItems.map((gift, index) => {
          return (
            <Grid item xs={6} sm={6} md={6} lg={4} key={index}>
              <PickGiftCard
                key={uniqueId}
                gift={gift}
                checked={() => handleCheckboxChange(gift.id)}
                selectedItems={selectedItems}
              />
            </Grid>
          );
        })}
      </Grid>
      <Stack spacing={2} alignItems="center">
        <TablePagination
          count={items.length}
          component="div"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          // renderItem={(item) => (
          //   <PaginationItem
          //     icon={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
          //     {...item}
          //   />
          // )}
        />
      </Stack>
    </Box>
  );
};

export default PickGiftCards;
